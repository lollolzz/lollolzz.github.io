import pygame

pygame.init()  # 초기화 (반드시 필요)

# 화면 크기 설정
screen_width = 400  # 가로 크기
screen_height = 640  # 세로 크기
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀 설정
pygame.display.set_caption("Nado Game")  # 게임 이름

# 배경 이미지 불러오기
background = pygame.image.load(
    "/Users/kwonneunghan/Desktop/Workspace/Python/파이썬 게임 만들기/pygame_basic/배경화면.jpeg"
)

# 이벤트 루프
running = True  # 게임이 진행중인가 ?
while running:
    for event in pygame.event.get():  # 이벤트가 발생하였는가 ?
        # 프로그램이 종료되지 않도록 하는 장치 같은거
        if event.type == pygame.QUIT:  # 창이 닫히는 이벤트가 발생하였는가?>
            running = False  # 게임이 진행중이 아님

        # screen.fill((0, 0, 255))  # 배경을 색깔로 채우기
        screen.blit(background, (0, 0))  # 배경 그리기

    pygame.display.update()  # 게임화면을 다시 그리기!

# pygame종료
pygame.quit()
