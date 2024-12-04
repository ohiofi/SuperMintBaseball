import re

colors_hsl = {
    "reds": {
        "darker": "hsl(0, 100%, 20%)",
        "mid": "hsl(0, 100%, 50%)",
        "light": "hsl(0, 100%, 80%)"
    },
    "firebrick": {
        "dark": "hsl(0, 67%, 32%)",
        "mid": "hsl(0, 68%, 41%)",
        "light": "hsl(0, 69%, 90%)"
    },
    "oranges": {
        "darker": "hsl(30, 100%, 20%)",
        "mid": "hsl(32, 100%, 50%)",
        "light": "hsl(33, 100%, 80%)"
    },
    "gold": {
        "darker": "hsl(50, 100%, 30%)",
        "mid": "hsl(51, 100%, 50%)",
        "light": "hsl(52, 100%, 90%)"
    },
    "electric_yellow": {
        "dark": "hsl(60, 50%, 20%)",
        "mid": "hsl(60, 100%, 60%)",
        "light": "hsl(60, 100%, 80%)"
    },
    "chartreuse": {
        "dark": "hsl(70, 100%, 31%)",
        "mid": "hsl(69, 100%, 61%)",
        "light": "hsl(69, 100%, 92%)"
    },
    "duron_electric_lime": {
        "dark": "hsl(98, 100%, 10%)",
        "mid": "hsl(98, 100%, 45%)",
        "light": "hsl(98, 100%, 81%)"
    },
    "neon_green": {
        "dark": "hsl(132, 100%, 30%)",
        "mid": "hsl(132, 100%, 55%)",
        "light": "hsl(132, 100%, 92%)"
    },
    "spring_green": {
        "darker": "hsl(160, 100%, 25%)",
        "mid": "hsl(160, 100%, 50%)",
        "light": "hsl(160, 100%, 81%)"
    },
    "electric_turquoise": {
        "darker": "hsl(176, 100%, 30%)",
        "mid": "hsl(177, 100%, 60%)",
        "light": "hsl(177, 100%, 90%)"
    },
    "azure": {
        "darker": "hsl(211, 90%, 21%)",
        "mid": "hsl(211, 90%, 51%)",
        "light": "hsl(211, 90%, 82%)"
    },
    "rich_electric_blue": {
        "dark": "hsl(198, 100%, 32%)",
        "mid": "hsl(197, 91%, 44%)",
        "light": "hsl(197, 89%, 92%)"
    },
    "electric_indigo": {
        "dark": "hsl(252, 100%, 21%)",
        "mid": "hsl(252, 100%, 52%)",
        "light": "hsl(252, 100%, 82%)"
    },
    "electric_purple": {
        "darker": "hsl(275, 100%, 15%)",
        "dark": "hsl(275, 100%, 31%)",
        "mid": "hsl(275, 100%, 52%)",
        "light": "hsl(275, 100%, 92%)"
    },
    "pinks": {
        "darker": "hsl(319, 100%, 20%)",
        "dark": "hsl(319, 100%, 29%)",
        "mid": "hsl(319, 100%, 50%)",
        "light": "hsl(319, 100%, 80%)"
    },
    "darkgray": {
        "mid": "hsl(240, 20%, 33%)"
    },
    "gray": {
        "mid": "hsl(240, 20%, 50%)"
    },
    "lightgray": {
        "mid": "hsl(240, 20%, 66%)"
    },
    "steel_blue": {
        "mid": "hsl(207, 44%, 49%)"
    },
    "chocolate": {
        "mid": "hsl(25, 75%, 47%)"
    }
}


# colors = {
#     "reds":{
#         "darker":"660000",
#         "mid":"ff0000",
#         "light":"ff6666"
#     },
#     "firebrick":{
#          "dark":"891a1a",
#       "mid":"b22222",
#       "light":  "d83131" 
#     },
#     "oranges":{
#         "darker":"663600",
#         "mid":"ff8700",    
#         "light":"ffb866"
#     },  
#     "gold":{
#         "darker":"665500",
#         "mid":"ffd300", 
#         "light":"ffe666"
#     },  
#     "electric_yellow":{
#         "dark":"666600",
#         "mid":"ffff33",  
#         "light":"ffff99"
#     },
#     "chartreuse":{
#         "dark":"8a9f00", 
#         "mid":"deff0a",
#         "light":"ecff70"
#     },  
#     "duron_electric_lime":{
#         "dark":"62a300",
#         "mid":"81d800",
#         "light":"c6ff70"
#     },
#     "neon_green":{
#         "dark":"1ec700",
#         "mid":"39FF14",
#         "light":"79ff61"
#     },
#     "spring_green":{
#         "darker":"007041",
#         "mid":"0aff99", 
#         "light":"6cffc2"
#     },  
#     "electric_turquoise":{
#          "darker":"00574f",
#         "mid":"26ffed",
#         "light":"8afff5"
#     },
#     "azure":{
#         "darker":"04356c",
#         "mid":"147df5",
#         "light":"4598f7"
#     },
#     "rich_electric_blue":{  
        
#         "dark":"044b6c", 
#         "mid":"0892D0",  
#         "light":"44bff8"
#     },  
#     "electric_indigo":{
#         "dark":"32009f",  
#         "mid":"580aff", 
#         "light":"9b6cff"
#     },  
#     "electric_purple":{
#         "darker":"520070",
#         "dark":"75009f",  
#         "mid":"be0aff",   
#         "light":"d86cff"
#     },  
#     "pinks":{
#          "darker":"66005a",
#         "dark":"990087",
#         "mid":"ff00e1",
#         "light":"ff66ed"
#     },
#     "gray":{        
#         "mid":"8888aa",       
#     },
#     "darkgray":{      
#         "mid":"666688",       
#     },
#     "lightgray":{    
#         "mid":"aaaacc",       
#     },
#     "steel_blue":{
#          "mid":"4682B4"
#     },
#     "chocolate":{
#          "mid":"D2691E"
#     }
# }

def hue_to_rgb(h, s, l):
        if l < 0:
            l += 1
        if l > 1:
            l -= 1
        if l < 1/6:
            return h + (s - h) * 6 * l
        if l < 1/2:
            return s
        if l < 2/3:
            return h + (s - h) * (2/3 - l) * 6
        return h

def hsl_to_hex(hsl_str):
    # Extract the H, S, and L values using regular expressions
    match = re.match(r"hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)", hsl_str)
    if not match:
        raise ValueError("Invalid HSL format")
    
    h, s, l = map(int, match.groups())
    s /= 100
    l /= 100
    if s == 0:
        r = g = b = l  # Achromatic case
    else:
        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q
        r = hue_to_rgb(p, q, h / 360 + 1/3)
        g = hue_to_rgb(p, q, h / 360)
        b = hue_to_rgb(p, q, h / 360 - 1/3)

    # Convert to hexadecimal
    hex_color = f"{int(r * 255):02x}{int(g * 255):02x}{int(b * 255):02x}"
    return hex_color



def generate_color_combinations_as_objects(color_object):
    colorPaletteUrl = "https://www.colorzilla.com/colors/"
    colorList = []
    color_families = list(color_object.keys())

    # Iterate over all pairs of color families
    for i in range(len(color_families)):
        for j in range(i + 1, len(color_families)):
            family1 = color_object[color_families[i]]
            family2 = color_object[color_families[j]]       
            # Generate objects with light, mid, and dark properties
            for key1, shade1 in family1.items():
                if hsl_to_hex(shade1) not in colorPaletteUrl:
                            colorPaletteUrl += hsl_to_hex(shade1) + "+"
                if key1 in ["dark", "darker"]:

                    for key2, shade2 in family2.items():

                        
                        if key2 == "mid":
                            colorList.append({
                                "light": hsl_to_hex(family1["light"]),
                                "mid": hsl_to_hex(family2.get("mid", None)),  # Default to None if not present
                                "dark": hsl_to_hex(shade1)
                            })
    print(colorPaletteUrl)
    return colorList

# Generate combinations as objects
combinations = generate_color_combinations_as_objects(colors_hsl)

# Format the output as JavaScript objects
formatted_list = [f'{{"light": "#{obj["light"]}", "mid": "#{obj["mid"]}", "dark": "#{obj["dark"]}"}}' for obj in combinations]

with open("Colors.js", 'w') as f:
    f.write("const colorCombinations = [\n")
    f.write(",\n".join(formatted_list))  # Nicely format as a comma-separated string
    f.write("\n];")
f.close()
