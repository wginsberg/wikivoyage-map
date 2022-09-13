#!/usr/bin/env python3

import sys

if sys.version_info.major < 3:
  print("demo.py requires python3 or later: python3 demo.py")
  exit(1)
import os
import re
import mmap
import http.server
from socketserver import ThreadingMixIn
import webbrowser
from http import HTTPStatus

filemap = None

def byterange(s):
  m = re.compile(r'bytes=(\d+)-(\d+)?$').match(s)
  return int(m.group(1)), int(m.group(2))

class Handler(http.server.SimpleHTTPRequestHandler):
  def end_headers(self):
    if self.path.startswith('/tiles') or self.path.startswith('/fonts'):
      self.send_header('Access-Control-Allow-Origin', '*')
    http.server.SimpleHTTPRequestHandler.end_headers(self)

  def translate_path(self, path):
    return http.server.SimpleHTTPRequestHandler.translate_path(self,'./' + path)

  def log_message(self, fmt, *args):
    print(fmt % args)

  def do_GET(self):
    if self.path.endswith(".pmtiles"):
      self.send_response(HTTPStatus.PARTIAL_CONTENT)
      self.send_header('Content-type','application/pbf')
      first, last = byterange(self.headers['Range'])
      self.send_header('Content-Length',str(last-first+1))
      self.end_headers()
      self.wfile.write(filemap[first:last+1])
      return

    f = self.send_head()
    if f:
      try:
        self.copyfile(f, self.wfile)
      finally:
        f.close()

class ThreadingSimpleServer(ThreadingMixIn, http.server.HTTPServer):
    pass

if __name__ == "__main__":
  with open('tiles.pmtiles', "r+b") as f:
    print("Serving files at http://localhost:3857/ - for development use only")
    filemap = mmap.mmap(f.fileno(), 0)
    httpd = ThreadingSimpleServer(("", 3857), Handler)
    try:
      webbrowser.open('http://localhost:3857/index.html')
      httpd.serve_forever()
    finally:
      httpd.server_close()
