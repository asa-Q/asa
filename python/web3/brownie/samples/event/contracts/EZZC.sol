// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.5.99 <0.8.0;

contract EZZC {
	event greeting(string name);
	function say()  public payable{
	emit	greeting('ezzc');
	}
}
