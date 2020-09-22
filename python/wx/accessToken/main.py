# -*- coding: utf-8 -*-
#!/usr/bin/env python3
#filename main.py
import web
from SignToken import Handle

urls = (
#    '/wx', 'Handle',
     '/statics/platform/menu/', 'Handle',
)

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
