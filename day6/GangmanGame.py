import pygame # type: ignore # 1. pygame 선언

pygame.init() # 2. pygame 초기화

# 3. pygame에 사용되는 전역변수 선언
WHITE = (255,255,255)
BLACK = (0, 0, 0)
size = [400, 300]
screen = pygame.display.set_mode(size)

done = False
clock = pygame.time.Clock()

# 4. pygame 무한루프
def runGame():
    global done
    
    ## 게임판 크기
    screen_width = size[0]
    screen_height = size[1]
    while not done:
        clock.tick(30)
        screen.fill(BLACK)
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                done = True
                break

        pygame.display.update()

runGame()
pygame.quit()