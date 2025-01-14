# birds 에는 Eagle 클라스를 지정
class Eagle:
    # 동물들의 정보를 출력하는 프로그램을 작성
    def __init__(self, name, age):
        self.name = name
        self.age = age
    # 동물들의 정보를 출력하여 반환 받기
    def info(self):
        return f'독수리의 이름: {self.name} , 나이 : {self.age}'

