import re
import json

seed_path = r"c:\Users\acer\Downloads\SalinKamay (2)\SalinKamay\app\static\js\seed.js"

with open(seed_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add category Alphabet
category_replacement = """        {
                "id": "drinks",
                "name": "Mga Inumin",
                "icon": "🥛"
        },
        {
                "id": "alphabet",
                "name": "Alphabet",
                "icon": "🔤"
        }
];"""

content = content.replace("""        {
                "id": "drinks",
                "name": "Mga Inumin",
                "icon": "🥛"
        }
];""", category_replacement)

# Generate lessons
letters = [chr(i) for i in range(ord('A'), ord('Z')+1)]
lessons_str = ""

for i, letter in enumerate(letters):
    lesson_id = 105 + i
    lesson_obj = f"""        {{
                "id": "lesson_{lesson_id}",
                "categoryId": "alphabet",
                "title": "{letter}",
                "description": "I-sign ang letrang '{letter}' sa Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Ihanda ang kamay para sa pagsenyas ng letra.",
                        "Gayahin ang hugis ng kamay at posisyon ng mga daliri.",
                        "I-execute ang senyas nang malinaw."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/{letter}.png"
        }}"""
    
    if i < len(letters) - 1:
        lesson_obj += ",\n"
    else:
        lesson_obj += "\n];"
        
    lessons_str += lesson_obj

# Replace closing of lessons array
lessons_replacement = """                "animation": "/fsl-105-dataset/clips/104/0.MOV"
        },
""" + lessons_str

content = content.replace("""                "animation": "/fsl-105-dataset/clips/104/0.MOV"
        }
];""", lessons_replacement)

with open(seed_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("seed.js updated successfully.")
