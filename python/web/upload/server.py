#!/usr/bin/python
# -*- coding: UTF-8 -*-
import pika
import tornado
import tornado.ioloop
import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("ZY-Projects")

class ZY(tornado.web.RequestHandler):
    def get(self):
        self.render('login.html',**{'k1':'v1','k2':['v21','v22'],'k3':{'name':'test','age':18}})
#        self.write("EZZC")


class UploadFileHandler(tornado.web.RequestHandler):
    def get(self):
        self.write('''
        <html>
          <head><title>Upload File</title></head>
          <body>
            <form action='file' enctype="multipart/form-data" method='post'>
            <input type='file' name='file'/><br/>
            <input type='submit' value='submit'/>
            </form>
          </body>
        </html>
        ''')

    def post(self):
        #文件的暂存路径
        upload_path=os.path.join(os.path.dirname(__file__),'/zyroot/statics/asa')  
        #提取表单中‘name’为‘file’的文件元数据
        file_metas=self.request.files['file']    
        for meta in file_metas:
            filename=meta['filename']
            filepath=os.path.join(upload_path,filename)
            #有些文件需要已二进制的形式存储，实际中可以更改
            with open(filepath,'wb') as up:      
                up.write(meta['body'])
            #self.write('finished!')
            self.write('http://www.ziyichain.com/statics/'+filename)
            #send_msg('http://www.ziyichain.com/statics/'+filename)



def send_msg(msg):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='127.0.0.1'))
    channel = connection.channel()
    channel.queue_declare(queue='testQueue',
                        durable = True,
                  #      passive = False,
                  #      exclusive = False,
                  #      auto_delete = False


            )
    channel.basic_publish(exchange='',
                      routing_key='',
                      body=msg)
    print("send:"+msg)
    connection.close()

def make_app():
    setting = dict(
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
    )
    
    
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/zy", ZY),
        (r"/file", UploadFileHandler),],
        **setting
    )

if __name__ == "__main__":
    app = make_app()
    app.listen(8886)
    tornado.ioloop.IOLoop.current().start()
