colors = {
   "red":{

    
      "300":"#990000",
 
      "500":"#ff0000",
 
      "700":"#ff6666",

   },
   "ut_orange":{

     
      "300":"#995200",
 
      "500":"#ff8700",
     
      "700":"#ffb866",

   },
   "gold":{

  
      "300":"#998000",
  
      "500":"#ffd300",
  
      "700":"#ffe666",

   },
   "chartreuse":{

   
      "300":"#8a9f00",
  
      "500":"#deff0a",
    
      "700":"#ebff6c",

   },
   "spring_bud":{

      "300":"#629f00",
 
      "500":"#a1ff0a",
  
      "700":"#c7ff6c",

   },
   "spring_green":{

  
      "300":"#009f5d",
    
      "500":"#0aff99",
  
      "700":"#6cffc2",

   },
   "electric_blue":{

   
      "300":"#00959f",
  
      "500":"#0aefff",
   
      "700":"#6cf5ff",

   },
   "azure":{

  
      "300":"#064b99",
    
      "500":"#147df5",
    
      "700":"#72b1f9",

   },
   "electric_indigo":{

    
      "300":"#32009f",
   
      "500":"#580aff",
  
      "700":"#9b6cff",
 
   },
   "electric_purple":{

  
      "300":"#75009f",
   
      "500":"#be0aff",
    
      "700":"#d86cff",

   },
   "black_to_white":{
        "300":"#000000",
        "500":"#888888",
        "700":"#ffffff",
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
                    if key1 != key2:
                        result.append([shade1, shade2])
    return result

# Usage
combinations = generate_color_combinations(colors)
formatted_list = [f'"{item}"' if isinstance(item, str) else str(item) for item in combinations]
with open("results.txt", 'w') as f:
        f.write(", ".join(formatted_list))  # Nicely format as a comma-separated string
