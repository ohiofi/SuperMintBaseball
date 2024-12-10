# crest maker
from turtle import *
svgPath = ""

def getPoint():
    return ""+xcor()+","+ycor()+" "

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
    seth(25)
    for i in range(80):
        fd(1)
        lt(.7)
    mysteryHeading = heading()
    lt(90-mysteryHeading)
    fd(33)
    lt(90)
    x=xcor()
    goto(100-x, ycor())
    lt(90)
    fd(33)
    lt(90-mysteryHeading)
    for i in range(80):
        fd(1)
        lt(.7)
    pu()
    home()

drawBorders()
mlsCrest()
update()
