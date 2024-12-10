# crest maker
from turtle import *
svgPath = ""

def setPoint():
    global svgPath
    svgPath += ""+str(round(xcor(),1))+","+str(round(100-ycor(),1))+" "

def drawBorders():
    pd()
    goto(0,100)
    goto(100,100)
    goto(100,0)
    home()


def mlsCrest():
    pu()
    goto(50,2)
    pd()
    seth(35)
    setPoint()
    for i in range(7):
        fd(8)
        lt(.7*8)
        setPoint()
    mysteryHeading = heading()
    lt(90-mysteryHeading)
    fd(44)
    setPoint()
    lt(90)
    x=xcor()
    goto(100-x, ycor())
    setPoint()
    lt(90)
    fd(44)
    setPoint()
    lt(90-mysteryHeading)
    for i in range(7):
        lt(.7*8)
        fd(8)
        setPoint()
    pu()
    home()
    print(svgPath)


def dallasStyleCrest():
    pu()
    goto(50,2)
    pd()
    seth(40)
    setPoint()
    for i in range(6):
        fd(8*2)
        lt(.5*16)
        setPoint()
    lt(70)
    for i in range(6):
        fd(8)
        lt(.5*8)
        setPoint()
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    mysteryDistance = xcor() - 50
    fd(mysteryDistance)
    fd(mysteryDistance)
    lt(180-mysteryHeading)
    for i in range(6):
        lt(.5*8)
        fd(8)
        setPoint()
    lt(70)
    for i in range(6):
        lt(.5*16)
        fd(8*2)
        setPoint()
    print(svgPath)

def unitedStyleCrest():
    pu()
    goto(50,2)
    pd()
    seth(60)
    setPoint()
    for i in range(6):
        fd(3)
        rt(5)
        setPoint()
    for i in range(5):
        fd(7*2*0.7)
        lt(8*2)
        setPoint()
    for i in range(9):
        fd(3*1.5)
        rt(2*2.1)
        setPoint()
        # print(heading())
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    mysteryDistance = xcor() - 50
    fd(mysteryDistance)
    setPoint()
    fd(mysteryDistance)
    lt(180-mysteryHeading)
    for i in range(9):
        rt(2*2.1)
        fd(3*1.5)
        setPoint()
    for i in range(5):
        lt(8*2)
        fd(7*2*0.7)
        setPoint()
    for i in range(6):
        rt(5)
        fd(3)
        setPoint()
    print(svgPath)


drawBorders()
unitedStyleCrest()
update()
mainloop()