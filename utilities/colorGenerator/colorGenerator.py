colors = {
    "reds":{
        "darker":"660000",
        # "dark":"990000",
        "mid":"ff0000",
        "light":"ff6666"
    },
    "firebrick":{
         "dark":"891a1a",
      "mid":"b22222",
      "light":  "d83131" 
    },
    "oranges":{
        "darker":"663600",
        # "dark":"995200",
        "mid":"ff8700",    
        "light":"ffb866"
    },  
    "gold":{
        "darker":"665500",
        # "dark":"998000", 
        "mid":"ffd300", 
        "light":"ffe666"
    },  
    "electric_yellow":{
        "dark":"666600",
        "mid":"ffff33",  
        "light":"ffff99"
    },
    "chartreuse":{
        "dark":"8a9f00", 
        "mid":"deff0a",
        "light":"ecff70"
    },  
    "duron_electric_lime":{
        "dark":"62a300",
        "mid":"81d800",
        "light":"c6ff70"
    },
    "neon_green":{
        "dark":"1ec700",
        "mid":"39FF14",
        "light":"79ff61"
    },
    "spring_green":{
        "darker":"007041",
        # "dark":"009f5d",   
        "mid":"0aff99", 
        "light":"6cffc2"
    },  
    "electric_turquoise":{
         "darker":"00574f",
        "mid":"26ffed",
        "light":"8afff5"
    },
    "azure":{
        "darker":"04356c",
        "mid":"147df5",
        "light":"4598f7"
    },
    "rich_electric_blue":{  
        
        "dark":"044b6c", 
        "mid":"0892D0",  
        "light":"44bff8"
    },  
    "electric_indigo":{
        "dark":"32009f",  
        "mid":"580aff", 
        "light":"9b6cff"
    },  
    "electric_purple":{
        "darker":"520070",
        "dark":"75009f",  
        "mid":"be0aff",   
        "light":"d86cff"
    },  
    "pinks":{
         "darker":"66005a",
        "dark":"990087",
        "mid":"ff00e1",
        "light":"ff66ed"
    },
    "gray":{        
        "mid":"8888aa",       
    },
    "darkgray":{      
        "mid":"666688",       
    },
    "lightgray":{    
        "mid":"aaaacc",       
    },
    "steel_blue":{
         "mid":"4682B4"
    },
    "chocolate":{
         "mid":"D2691E"
    }
}

# def generate_color_combinations(color_object):
#     colorPaletteUrl = "https://www.colorzilla.com/colors/"
#     result = []
#     color_families = list(color_object.keys())

#     # Iterate over all pairs of color families
#     for i in range(len(color_families)):
#         for j in range(i + 1, len(color_families)):
#             family1 = color_object[color_families[i]]
#             family2 = color_object[color_families[j]]       
#             # Generate combinations between shades of the two families
#             for key1, shade1 in family1.items():
#                 # ensure that the combo starts with mid, light, or lighter
#                 if key1 not in ["mid", "light", "lighter"]:
#                     continue
#                 if not shade1 in colorPaletteUrl:
#                     colorPaletteUrl += shade1 + "+"
#                 for key2, shade2 in family2.items():
#                     if key1[0] == key2[0]: # don't match dark with dark, dark with darker, etc.
#                         continue
#                     result.append([shade1, shade2])
#     print(colorPaletteUrl)
#     return result



# combinations = generate_color_combinations(colors)

# formatted_list = [f'["#{combo[0]}", "#{combo[1]}"]' for combo in combinations]
# with open("Colors.js", 'w') as f:
#         f.write("const colorCombinations = [\n")
#         f.write(",\n".join(formatted_list))  # Nicely format as a comma-separated string
#         f.write("]")
# f.close()
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
                if shade1 not in colorPaletteUrl:
                    colorPaletteUrl += shade1 + "+"
                if key1 in ["dark", "darker"]:

                    for key2, shade2 in family2.items():
                        if key2 == "mid":
                            colorList.append({
                                "light": family1["light"],
                                "mid": family2.get("mid", None),  # Default to None if not present
                                "dark": shade1
                            })
    print(colorPaletteUrl)
    return colorList

# Generate combinations as objects
combinations = generate_color_combinations_as_objects(colors)

# Format the output as JavaScript objects
formatted_list = [f'{{"light": "#{obj["light"]}", "mid": "#{obj["mid"]}", "dark": "#{obj["dark"]}"}}' for obj in combinations]

with open("Colors.js", 'w') as f:
    f.write("const colorCombinations = [\n")
    f.write(",\n".join(formatted_list))  # Nicely format as a comma-separated string
    f.write("\n];")
f.close()
