#!/usr/bin/python
from os import walk

exclude = ['jquery-1.7.2.min.js']
output = "tabulalbus.js"

res = ''
for dir_inf in walk('.'):
	for f_name in dir_inf[2]:
		if f_name == output or f_name[-3:]!='.js' or f_name in exclude: continue
		full_path = dir_inf[0]+'/'+f_name
		f = open(full_path,"r")
		res += '\n'
		res += f.read()
		f.close()

f = open(output,'w')
f.write(res)
f.close()