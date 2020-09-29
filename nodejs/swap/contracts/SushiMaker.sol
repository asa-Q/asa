pragma solidity 0.6.12;

import "./lib/token/ERC20/IERC20.sol";
import "./lib/token/ERC20/SafeERC20.sol";
import "./lib/math/SafeMath.sol";
import "./lib/ezzc/interfaces/IEZZCERC20.sol";
import "./lib/ezzc/interfaces/IEZZCPair.sol";
import "./lib/ezzc/interfaces/IEZZCFactory.sol";


contract SushiMaker {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    IEZZCFactory public factory;
    address public bar;
    address public sushi;
    address public weth;

    constructor(IEZZCFactory _factory, address _bar, address _sushi, address _weth) public {
        factory = _factory;
        sushi = _sushi;
        bar = _bar;
        weth = _weth;
    }

    function convert(address token0, address token1) public {
        // At least we try to make front-running harder to do.
        require(msg.sender == tx.origin, "do not convert from contract");
        IEZZCPair pair = IEZZCPair(factory.getPair(token0, token1));
        pair.transfer(address(pair), pair.balanceOf(address(this)));
        pair.burn(address(this));
        uint256 wethAmount = _toWETH(token0) + _toWETH(token1);
        _toSUSHI(wethAmount);
    }

    function _toWETH(address token) internal returns (uint256) {
        if (token == sushi) {
            uint amount = IERC20(token).balanceOf(address(this));
            _safeTransfer(token, bar, amount);
            return 0;
        }
        if (token == weth) {
            uint amount = IERC20(token).balanceOf(address(this));
            _safeTransfer(token, factory.getPair(weth, sushi), amount);
            return amount;
        }
        IEZZCPair pair = IEZZCPair(factory.getPair(token, weth));
        if (address(pair) == address(0)) {
            return 0;
        }
        (uint reserve0, uint reserve1,) = pair.getReserves();
        address token0 = pair.token0();
        (uint reserveIn, uint reserveOut) = token0 == token ? (reserve0, reserve1) : (reserve1, reserve0);
        uint amountIn = IERC20(token).balanceOf(address(this));
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        uint amountOut = numerator / denominator;
        (uint amount0Out, uint amount1Out) = token0 == token ? (uint(0), amountOut) : (amountOut, uint(0));
        _safeTransfer(token, address(pair), amountIn);
        pair.swap(amount0Out, amount1Out, factory.getPair(weth, sushi), new bytes(0));
        return amountOut;
    }

    function _toSUSHI(uint256 amountIn) internal {
        IEZZCPair pair = IEZZCPair(factory.getPair(weth, sushi));
        (uint reserve0, uint reserve1,) = pair.getReserves();
        address token0 = pair.token0();
        (uint reserveIn, uint reserveOut) = token0 == weth ? (reserve0, reserve1) : (reserve1, reserve0);
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        uint amountOut = numerator / denominator;
        (uint amount0Out, uint amount1Out) = token0 == weth ? (uint(0), amountOut) : (amountOut, uint(0));
        pair.swap(amount0Out, amount1Out, bar, new bytes(0));
    }

    function _safeTransfer(address token, address to, uint256 amount) internal {
        IERC20(token).safeTransfer(to, amount);
    }
}
