# 넓이 를 수행하는 함수들의 모듈을 만들기
import math
# 원의 넓이 를 구하라
def circle_area(radius):
# math.pi 모듈에 pi의 3.14 와 radius 반지름  * radius 반지름 의 값을 return 반환을 받는다
    return math.pi * radius *radius
# 삼각형의 넓이 를 구하라
def triangle_area(bottom, height):
# bottom 밑변 * height 높이 를 하여 / 2로 나눠 값을 return 하여 돌려 받는다
    return bottom * height / 2
#직육면체의 넓이
def rectangular_area(width , length , height):
# width 밑변 가로 * length 밑변 세로 + length 밑변 세로 * height 높이 + height 높이 * width 밑변 가로  
# 의 값을 return 반환 받는다
    return (width * length + length * height + height * width) * 2