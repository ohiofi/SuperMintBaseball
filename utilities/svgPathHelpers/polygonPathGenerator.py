import math
result = ""
for i in range(10):
    amplitude = 45
    if i%2==0:
        amplitude = 30
    x = round(math.cos(i*2*math.pi/10+2*math.pi/10)*amplitude + 50,1)
    y = round(math.sin(i*2*math.pi/10+2*math.pi/10)*amplitude + 50,1)
    result += str(x)+","+str(y)+" "
print(result)