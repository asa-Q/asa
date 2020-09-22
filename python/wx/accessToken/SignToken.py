# -*- coding: utf-8 -*-
#!/usr/bin/env python3
#filename handle.py
import hashlib
import web


class Handle(object):

    def POST(self):
        pass

    # get方法，验证token
    def GET(self):
        try:
            data = web.input()
            if len(data) == 0:
                return "token success!"
            signature = data.signature
            timestamp = data.timestamp
            nonce = data.nonce
            echostr = data.echostr
            token = "ywToken"  # 请按照公众平台官网\基本配置中信息填写,两个token保持一致

            list = [token, timestamp, nonce]
            list.sort()
            sha1 = hashlib.sha1()
            sha1.update(list[0].encode("utf-8"))
            sha1.update(list[1].encode("utf-8"))
            sha1.update(list[2].encode("utf-8"))
            hashcode = sha1.hexdigest()  # 获取加密串

            # 验证
            print("handle/GET func: hashcode, signature: ", hashcode, signature)
            if hashcode == signature:
                return echostr
            else:
                return ""

        except Exception as Argument:
            return Argument
