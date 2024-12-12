# crest maker
from turtle import *
import math
svgPath = ""
tracer(0)
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
    seth(55)
    setPoint()
    for i in range(3):
        fd(7)
        rt(10)
        setPoint()
    for i in range(5):
        fd(7*2*0.65)
        lt(8*2)
        setPoint()
    for i in range(5):
        fd(6*1.4)
        rt(4*2.1)
        setPoint()
        # print(heading())
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    mysteryDistance = xcor() - 50
    fd(mysteryDistance)
    setPoint()
    fd(mysteryDistance)
    setPoint()
    lt(180-mysteryHeading)
    for i in range(5):
        rt(4*2.1)
        fd(6*1.4)
        setPoint()
    for i in range(5):
        lt(8*2)
        fd(7*2*0.65)
        setPoint()
    for i in range(3):
        rt(10)
        fd(7)
        setPoint()
    print(svgPath)

def galaxyStyleCrest():
    pu()
    goto(50,2)
    pd()
    seth(40)
    setPoint()
    for i in range(6):
        fd(14)
        lt(8)
        setPoint()
    lt(70)
    for i in range(6):
        fd(8.078755)
        rt(4)
        setPoint()
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    setPoint()
    lt(180-mysteryHeading)
    for i in range(6):
        rt(4)
        fd(8.078755)
        setPoint()
    lt(70)
    for i in range(6):
        lt(8)
        fd(14)
        setPoint()
    print(svgPath)

def raidersStyleCrest():
    pu()
    goto(50,2)
    pd()
    seth(40)
    setPoint()
    for i in range(7):
        fd(15.5)
        lt(7.75)
        setPoint()
    lt(120)
    for i in range(8):
        fd(6.25)
        rt(10)
        setPoint()
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    mysteryDistance = xcor() - 50
    fd(mysteryDistance)
    setPoint()
    fd(mysteryDistance)
    lt(180-mysteryHeading)
    setPoint()
    for i in range(8):
        rt(10)
        fd(6.25)
        setPoint()
    lt(120)
    for i in range(7):
        lt(7.75)
        fd(15.5)
        setPoint()
    print(svgPath)

def raidersStyleCrestB(scale):
    pu()
    goto(50,2)
    pd()
    seth(40)
    setPoint()
    for i in range(7):
        fd(15.5 *scale)
        lt(7.75)
        setPoint()
    lt(120)
    print(100-xcor(),ycor())
    for i in range(8):
        fd(6.25*scale)
        rt(10)
        setPoint()
    mysteryHeading = heading()
    lt(180-mysteryHeading)
    mysteryDistance = xcor() - 50
    fd(mysteryDistance)
    setPoint()
    fd(mysteryDistance)
    lt(180-mysteryHeading)
    setPoint()
    for i in range(8):
        rt(10)
        fd(6.25*scale)
        setPoint()
    lt(120)
    print(xcor(),ycor())
    for i in range(7):
        lt(7.75)
        fd(15.5*scale)
        setPoint()
    print(svgPath)

def sixPointedTopCrest():
    pu()
    goto(50,2)
    pd()
    seth(50)
    setPoint()
    for i in range(3):
        fd(9)
        rt(10)
        setPoint()
    for i in range(5):
        fd(7.65)
        lt(8*2)
        setPoint()
    for i in range(5):
        fd(9)
        rt(8)
        setPoint()
    #corner
    #print(215-heading())
    lt(66)
    #print(100-xcor(),ycor())
    for i in range(5):
        lt(90)
        for i in range(5):
            fd(4.14555) # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rt(18)
            setPoint()
        #print(215-heading())
    #print(xcor(),ycor())
    lt(174)
    for i in range(5):
        rt(8)
        fd(9)
        setPoint()
    for i in range(5):
        lt(8*2)
        fd(7.65)
        setPoint()
    for i in range(3):
        rt(10)
        fd(9)
        setPoint()
    #print(xcor())
    print(svgPath)

def sixPointedTopCrestB():
    pu()
    goto(50,2)
    pd()
    seth(55)
    setPoint()
    for i in range(3):
        fd(9)
        rt(10)
        setPoint()
    for i in range(5):
        fd(7.65)
        lt(8*2)
        setPoint()
    for i in range(5):
        fd(9)
        rt(8)
        setPoint()
    #corner
    #print(215-heading())
    lt(61)
    print(100-xcor(),ycor())
    for i in range(5):
        lt(90)
        for i in range(5):
            #fd(4.14555) # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            fd(3.445 )
            rt(18)
            setPoint()
        #print(215-heading())
    # print(xcor(),ycor())
    lt(169)
    for i in range(5):
        rt(8)
        fd(9)
        setPoint()
    for i in range(5):
        lt(8*2)
        fd(7.65)
        setPoint()
    for i in range(3):
        rt(10)
        fd(9)
        setPoint()
    print(xcor())
    print(svgPath)

def fivePointedTopCrest():
    pu()
    goto(50,2)
    pd()
    seth(50)
    setPoint()
    for i in range(3):
        fd(9)
        rt(10)
        setPoint()
    for i in range(5):
        fd(7.6)
        lt(16.5)
        setPoint()
    for i in range(5):
        fd(9)
        rt(7.9)
        setPoint()
    fd(5)
    setPoint()
    #corner
    #print(215-heading())
    lt(47)
    #print(xcor(),ycor())
    #print(100-xcor(),ycor())
    for i in range(4):
        lt(120)
        for i in range(6):
            fd(4.644) # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rt(20)
            setPoint()
        #print(215-heading())
    #print(xcor(),ycor())
    lt(187)
    fd(5)
    for i in range(5):
        rt(7.9)
        fd(9)
        setPoint()
    for i in range(5):
        lt(16.5)
        fd(7.6)
        setPoint()
    for i in range(3):
        rt(10)
        fd(9)
        setPoint()
    print(xcor())
    print(svgPath)
   
def fourPointedTopCrest():
    pu()
    goto(50,2)
    pd()
    seth(25)
    setPoint()
    for i in range(3):
        fd(7)
        rt(7)
        setPoint()
    for i in range(4):
        fd(8)
        lt(23)
        setPoint()
    for i in range(5):
        fd(12.8)
        rt(4.5)
        setPoint()
    fd(5)
    setPoint()
    #corner
    #print(215-heading())
    lt(36.5)
    #print(xcor(),ycor())
    print(100-xcor(),ycor())
    for i in range(3):
        lt(120)
        for i in range(6):
            fd(6.311) # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            rt(20)
            setPoint()
        #print(215-heading())
    print(xcor(),ycor())
    lt(176)
    fd(5)
    setPoint()
    for i in range(5):
        rt(4.5)
        fd(12.8)
        setPoint()
    for i in range(4):
        lt(23)
        fd(8)
        setPoint()
    for i in range(3):
        rt(7)
        fd(7)
        setPoint()
    print(xcor())
    print(svgPath)

def rotatedSquare():
    radius = 40
    pu()
    goto(50,50)
    for i in range(5):
        x = math.cos(math.pi*0.5*i + math.pi*2/16)* radius + 50
        y = math.sin(math.pi*0.5*i + math.pi*2/16)* radius + 50
        goto(x,y)
        setPoint()
        pd()
    print(svgPath)

def eightPointedStar():
    bigRadius = 50
    lilRadius = 40
    pu()
    goto(50,50)
    for i in range(17):
        radius = 30
        if i%4==2:
            radius = bigRadius
        elif i%4==0:
            radius = lilRadius
        x = math.cos(math.pi*2*1/16*i)* radius*1.1 + 50
        y = math.sin(math.pi*2*1/16*i)* radius*0.9 + 50
        goto(x,y)
        setPoint()
        pd()
    print(svgPath)

drawBorders()
fivePointedTopCrest()
update()
mainloop()