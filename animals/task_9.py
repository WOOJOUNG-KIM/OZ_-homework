import sys
import os

# 현재 작업 디렉토리를 sys.path에 추가
sys.path.append(os.path.abspath(os.path.dirname(__file__)))


# from 을 사용하여 묘듈을 가져오고 import 로 클리스를 가져온다
from asd.mammals import Dog
from asd.birds import Eagle

# 클래스 인스턴스 를 생성해 Dog 와 Eagle 내용을 가져온다
a = Dog(name = '김초선' , birth = '2021년10월10일')
b = Eagle(name = '피죤' , age = 2)

print(a.info())
print(b.info())