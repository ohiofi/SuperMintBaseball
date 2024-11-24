colors = {
    "reds":{
        "darker":"#660000",
        "dark":"#990000",
        "mid":"#ff0000",
        "light":"#ff6666"
    },
    "oranges":{
         "darker":"#663600",
        "dark":"#995200",
        "mid":"#ff8700",    
        "light":"#ffb866"
    },  
    "gold":{
         "darker":"#665500",
        "dark":"#998000", 
        "mid":"#ffd300", 
        "light":"#ffe666"
    },  
    "chartreuse":{
        "dark":"#8a9f00", 
        "mid":"#deff0a",   
        "light":"#f2ff9e"
    },  
    "spring_green":{
        "darker":"#007041",
        "dark":"#009f5d",   
        "mid":"#0aff99", 
        "light":"#6cffc2"
    },  
    "azure":{
        "darker":"#04356c",
        "mid":"#147df5"   
    },
    "electric_blue":{  
        
        "dark":"#00959f", 
        "mid":"#0aefff",  
        "light":"#9ef9ff"
    },  
    "electric_indigo":{
        "dark":"#32009f",  
        "mid":"#580aff", 
        "light":"#9b6cff"
    },  
    "electric_purple":{
        "darker":"#520070",
        "dark":"#75009f",  
        "mid":"#be0aff",   
        "light":"#d86cff"
    },  
    "pinks":{
         "darker":"#66005a",
        "dark":"#990087",
        "mid":"#ff00e1",
        "light":"#ff66ed"
    },
    "black_to_white":{
        "dark":"#555555",       
        "mid":"#888888",       
        "light":"#cccccc"
    }
}

def generate_color_combinations(color_object):
    result = []
    color_families = list(color_object.keys())

    # Iterate over all pairs of color families
    for i in range(len(color_families)):
        for j in range(i + 1, len(color_families)):
            family1 = color_object[color_families[i]]
            family2 = color_object[color_families[j]]       
            # Generate combinations between shades of the two families
            for key1, shade1 in family1.items():
                for key2, shade2 in family2.items():
                    if key1[0] == key2[0]:
                        continue
                    # print("added ", shade1, shade2)
                    result.append([shade1, shade2])
    return result

# Usage
combinations = generate_color_combinations(colors)
formatted_list = [f'["{combo[0]}", "{combo[1]}"]' for combo in combinations]
with open("Colors.js", 'w') as f:
        f.write("const colorCombinations = [\n")
        f.write(",\n".join(formatted_list))  # Nicely format as a comma-separated string
        f.write("]")
f.close()