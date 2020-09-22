import json
from urllib import parse, request


def get_wxCode_token():
    try:
        appid = "wxefb780b3a448e4e5"
        secret = ""
        textmod = {"grant_type": "client_credential",
            "appid": appid,
            "secret": secret
        }
        textmod = parse.urlencode(textmod)
        header_dict = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko'}
        url = 'https://api.weixin.qq.com/cgi-bin/token'
        req = request.Request(url='%s%s%s' % (url, '?', textmod), headers=header_dict)
        res = request.urlopen(req)
        res = res.read().decode(encoding='utf-8')
        res = json.loads(res)
        access_token = res["access_token"]
        print('access_token:', access_token)
        return access_token
    except Exception as e:
        print(e)
        return False


if __name__ == '__main__':
    get_wxCode_token()
