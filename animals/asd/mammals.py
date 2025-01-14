# mammals 에는 Dog 클레스를 지정
class Dog:
    # 동물들의 정보를 출력하는 프로그램을 작성
    def __init__(self, name, birth):
        self.name = name
        self.birth = birth
    # 동물들의 정보를 리턴하여 반환 받기
    def info(self):
        return f'강아지이름: {self.name} 태어난 년도: {self.birth}'