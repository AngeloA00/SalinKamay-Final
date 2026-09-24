import os
import csv
import json

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LABELS_PATH = os.path.join(BASE_DIR, "fsl-105-dataset", "labels.csv")
CLIPS_DIR = os.path.join(BASE_DIR, "fsl-105-dataset", "clips")
SEED_JS_PATH = os.path.join(BASE_DIR, "app", "static", "js", "seed.js")

# English titles mapped from raw dataset labels
english_title_map = {
    # GREETING
    "GOOD MORNING": "Good Morning",
    "GOOD AFTERNOON": "Good Afternoon",
    "GOOD EVENING": "Good Evening",
    "HELLO": "Hello",
    "HOW ARE YOU": "How Are You",
    "IM FINE": "I'm Fine",
    "NICE TO MEET YOU": "Nice to Meet You",
    "THANK YOU": "Thank You",
    "YOURE WELCOME": "You're Welcome",
    "SEE YOU TOMORROW": "See You Tomorrow",
    
    # SURVIVAL
    "UNDERSTAND": "Understand",
    "DON’T UNDERSTAND": "Don't Understand",
    "KNOW": "Know",
    "DON’T KNOW": "Don't Know",
    "NO": "No",
    "YES": "Yes",
    "WRONG": "Wrong",
    "CORRECT": "Correct",
    "SLOW": "Slow",
    "FAST": "Fast",
    
    # NUMBER
    "ONE": "One",
    "TWO": "Two",
    "THREE": "Three",
    "FOUR": "Four",
    "FIVE": "Five",
    "SIX": "Six",
    "SEVEN": "Seven",
    "EIGHT": "Eight",
    "NINE": "Nine",
    "NINE ": "Nine",
    "TEN": "Ten",
    
    # CALENDAR
    "JANUARY": "January",
    "FEBRUARY": "February",
    "MARCH": "March",
    "APRIL": "April",
    "MAY": "May",
    "JUNE": "June",
    "JULY": "July",
    "AUGUST": "August",
    "SEPTEMBER": "September",
    "OCTOBER": "October",
    "NOVEMBER": "November",
    "DECEMBER": "December",
    
    # DAYS
    "MONDAY": "Monday",
    "TUESDAY": "Tuesday",
    "WEDNESDAY": "Wednesday",
    "THURSDAY": "Thursday",
    "FRIDAY": "Friday",
    "SATURDAY": "Saturday",
    "SUNDAY": "Sunday",
    "TODAY": "Today",
    "TOMORROW": "Tomorrow",
    "YESTERDAY": "Yesterday",
    
    # FAMILY
    "FATHER": "Father",
    "MOTHER": "Mother",
    "SON": "Son",
    "DAUGHTER": "Daughter",
    "GRANDFATHER": "Grandfather",
    "GRANDMOTHER": "Grandmother",
    "UNCLE": "Uncle",
    "AUNTIE": "Auntie",
    "COUSIN": "Cousin",
    "PARENTS": "Parents",
    
    # RELATIONSHIPS
    "BOY": "Boy",
    "GIRL": "Girl",
    "MAN": "Man",
    "WOMAN": "Woman",
    "DEAF": "Deaf",
    "HARD OF HEARING": "Hard of Hearing",
    "WEELCHAIR PERSON": "Wheelchair User",
    "BLIND": "Blind",
    "DEAF BLIND": "Deaf-Blind",
    "MARRIED": "Married",
    
    # COLOR
    "BLUE": "Blue",
    "GREEN": "Green",
    "RED": "Red",
    "BROWN": "Brown",
    "BLACK": "Black",
    "WHITE": "White",
    "YELLOW": "Yellow",
    "ORANGE": "Orange",
    "GRAY": "Gray",
    "PINK": "Pink",
    "VIOLET": "Violet",
    "LIGHT": "Light",
    "DARK": "Dark",
    
    # FOOD
    "BREAD": "Bread",
    "EGG": "Egg",
    "FISH": "Fish",
    "MEAT": "Meat",
    "CHICKEN": "Chicken",
    "SPAGHETTI": "Spaghetti",
    "RICE": "Rice",
    "LONGANISA": "Longganisa",
    "SHRIMP": "Shrimp",
    "CRAB": "Crab",
    
    # DRINK
    "HOT": "Hot",
    "COLD": "Cold",
    "JUICE": "Juice",
    "MILK": "Milk",
    "COFFEE": "Coffee",
    "TEA": "Tea",
    "BEER": "Beer",
    "WINE": "Wine",
    "SUGAR": "Sugar",
    "NO SUGAR": "No Sugar",
}

# Tagalog search aliases
tagalog_alias_map = {
    # GREETING
    "GOOD MORNING": "Magandang Umaga",
    "GOOD AFTERNOON": "Magandang Hapon",
    "GOOD EVENING": "Magandang Gabi",
    "HELLO": "Hello / Kamusta",
    "HOW ARE YOU": "Kamusta Ka",
    "IM FINE": "Mabuti Naman",
    "I'M FINE": "Mabuti Naman",
    "NICE TO MEET YOU": "Kinagagalak Kong Makilala Ka",
    "THANK YOU": "Salamat",
    "YOURE WELCOME": "Walang Anuman",
    "YOU'RE WELCOME": "Walang Anuman",
    "SEE YOU TOMORROW": "Magkita Tayo Bukas",
    
    # SURVIVAL
    "UNDERSTAND": "Naintindihan",
    "DON’T UNDERSTAND": "Hindi Naintindihan",
    "DON'T UNDERSTAND": "Hindi Naintindihan",
    "KNOW": "Alam",
    "DON’T KNOW": "Hindi Alam",
    "DON'T KNOW": "Hindi Alam",
    "NO": "Hindi",
    "YES": "Oo",
    "WRONG": "Mali",
    "CORRECT": "Tama",
    "SLOW": "Mabagal",
    "FAST": "Mabilis",
    
    # NUMBER
    "ONE": "Isa",
    "TWO": "Dalawa",
    "THREE": "Tatlo",
    "FOUR": "Apat",
    "FIVE": "Lima",
    "SIX": "Anim",
    "SEVEN": "Pito",
    "EIGHT": "Walo",
    "NINE": "Siyam",
    "NINE ": "Siyam",
    "TEN": "Sampu",
    
    # CALENDAR
    "JANUARY": "Enero",
    "FEBRUARY": "Pebrero",
    "MARCH": "Marso",
    "APRIL": "Abril",
    "MAY": "Mayo",
    "JUNE": "Hunyo",
    "JULY": "Hulyo",
    "AUGUST": "Agosto",
    "SEPTEMBER": "Setyembre",
    "OCTOBER": "Oktubre",
    "NOVEMBER": "Nobyembre",
    "DECEMBER": "Disyembre",
    
    # DAYS
    "MONDAY": "Lunes",
    "TUESDAY": "Martes",
    "WEDNESDAY": "Miyerkules",
    "THURSDAY": "Huwebes",
    "FRIDAY": "Biyernes",
    "SATURDAY": "Sabado",
    "SUNDAY": "Linggo",
    "TODAY": "Ngayon",
    "TOMORROW": "Bukas",
    "YESTERDAY": "Kahapon",
    
    # FAMILY
    "FATHER": "Tatay / Ama",
    "MOTHER": "Nanay / Ina",
    "SON": "Anak na Lalaki",
    "DAUGHTER": "Anak na Babae",
    "GRANDFATHER": "Lolo",
    "GRANDMOTHER": "Lola",
    "UNCLE": "Tito",
    "AUNTIE": "Tita",
    "COUSIN": "Pinsan",
    "PARENTS": "Mga Magulang",
    
    # RELATIONSHIPS
    "BOY": "Batang Lalaki",
    "GIRL": "Batang Babae",
    "MAN": "Lalaki",
    "WOMAN": "Babae",
    "DEAF": "Bingi",
    "HARD OF HEARING": "Mahina ang Pandinig",
    "WEELCHAIR PERSON": "Gumagamit ng Wheelchair",
    "BLIND": "Bulag",
    "DEAF BLIND": "Bingi at Bulag",
    "MARRIED": "Kasal",
    
    # COLOR
    "BLUE": "Asul",
    "GREEN": "Berde",
    "RED": "Pula",
    "BROWN": "Kayumanggi",
    "BLACK": "Itim",
    "WHITE": "Puti",
    "YELLOW": "Dilaw",
    "ORANGE": "Kahel",
    "GRAY": "Abo",
    "PINK": "Rosas",
    "VIOLET": "Lila",
    "LIGHT": "Maliwanag",
    "DARK": "Madilim",
    
    # FOOD
    "BREAD": "Tinapay",
    "EGG": "Itlog",
    "FISH": "Isda",
    "MEAT": "Karne",
    "CHICKEN": "Manok",
    "SPAGHETTI": "Spaghetti",
    "RICE": "Kanin",
    "LONGANISA": "Longganisa",
    "SHRIMP": "Hipon",
    "CRAB": "Alimango",
    
    # DRINK
    "HOT": "Mainit",
    "COLD": "Malamig",
    "JUICE": "Juice",
    "MILK": "Gatas",
    "COFFEE": "Kape",
    "TEA": "Tsaa",
    "BEER": "Beer",
    "WINE": "Alak",
    "SUGAR": "Asukal",
    "NO SUGAR": "Walang Asukal",
}

# Category Configs in English
category_mapping = {
    "GREETING": {"id": "greetings", "name": "Greetings", "icon": "👋"},
    "SURVIVAL": {"id": "survival", "name": "Survival", "icon": "🚨"},
    "NUMBER": {"id": "numbers", "name": "Numbers", "icon": "🔢"},
    "CALENDAR": {"id": "calendar", "name": "Calendar", "icon": "📅"},
    "DAYS": {"id": "days", "name": "Days", "icon": "📆"},
    "FAMILY": {"id": "family", "name": "Family", "icon": "👨‍👩‍👧‍👦"},
    "RELATIONSHIPS": {"id": "relationships", "name": "Relationships", "icon": "🤝"},
    "COLOR": {"id": "colors", "name": "Colors", "icon": "🎨"},
    "FOOD": {"id": "food", "name": "Food", "icon": "🍔"},
    "DRINK": {"id": "drinks", "name": "Drinks", "icon": "🥤"}
}

alphabet_category = {"id": "alphabet", "name": "Alphabet", "icon": "🔤"}

def get_steps_and_desc(category_id, title):
    if category_id == "greetings":
        desc = f"Sign the greeting '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Raise your dominant hand to initiate the greeting.",
            "Mirror the hand movement and facial expression shown in the video.",
            "Face your palm outward toward the viewer with a clear, polite gesture."
        ]
    elif category_id == "survival":
        desc = f"Sign '{title}' in Filipino Sign Language (FSL) for everyday conversation."
        steps = [
            "Prepare your dominant hand in the starting position for the sign.",
            "Observe the finger shape and movement trajectory in the demonstration.",
            "Execute the sign with appropriate facial expression for clear understanding."
        ]
    elif category_id == "numbers":
        desc = f"Sign the number '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Raise your dominant hand at chest level facing the viewer.",
            "Mirror the exact finger positioning and count shown in the video.",
            "Hold the hand shape steady and clearly visible."
        ]
    elif category_id == "calendar":
        desc = f"Sign the month of '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your hand in front of your upper torso to begin the sign.",
            "Follow the hand shape and movement direction demonstrated in the video.",
            "Complete the sign smoothly with precise finger placement."
        ]
    elif category_id == "days":
        desc = f"Sign the day or time expression '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Set your dominant hand in position for the day or time reference.",
            "Follow the specific hand movement and rotation shown in the demonstration.",
            "Ensure the gesture is distinct and executed clearly."
        ]
    elif category_id == "family":
        desc = f"Sign the family member '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your dominant hand in the starting location near the face or chest.",
            "Follow the designated hand shape and movement path shown in the video.",
            "Execute the gesture smoothly to clearly communicate the family member."
        ]
    elif category_id == "relationships":
        desc = f"Sign '{title}' in Filipino Sign Language (FSL) to describe individuals or relationships."
        steps = [
            "Prepare your hand shape according to the sign demonstration.",
            "Match the finger formation and directional orientation shown in the video.",
            "Execute the sign clearly at the proper body location."
        ]
    elif category_id == "colors":
        desc = f"Sign the color '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Form the initial hand shape for the color sign.",
            "Replicate the specific motion, brush, or flutter demonstrated in the video.",
            "Keep the movement controlled and clearly visible."
        ]
    elif category_id == "food":
        desc = f"Sign the food item '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your hand near the mouth or chest area as shown in the video.",
            "Mirror the mimed action or sign gesture for the food item.",
            "Perform the movement cleanly with natural pacing."
        ]
    elif category_id == "drinks":
        desc = f"Sign the beverage '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Shape your hand to mimic holding a cup or the specific beverage gesture.",
            "Follow the hand orientation and motion demonstrated in the video.",
            "Perform the gesture smoothly and clearly."
        ]
    elif category_id == "alphabet":
        desc = f"Sign the letter '{title}' in the Filipino Sign Language (FSL) Alphabet."
        steps = [
            "Position your dominant hand upright in front of your chest or shoulder.",
            "Form the exact finger shape and thumb placement shown in the image.",
            "Hold the hand shape static and clearly facing forward."
        ]
    elif category_id == "animals":
        desc = f"Sign the animal '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your dominant hand in front of your body or near the face.",
            "Mirror the mimed characteristic or animal gesture shown in the video.",
            "Execute the sign with clear hand movements."
        ]
    elif category_id == "body_parts":
        desc = f"Sign the body part '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Point toward or mimic the contour of the body part with your dominant hand.",
            "Follow the exact handshape and placement demonstrated in the video.",
            "Perform the motion with precision."
        ]
    elif category_id == "emotion":
        desc = f"Express the emotion '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your hands relative to your chest or face as shown.",
            "Replicate the dynamic hand movement indicating the emotional state.",
            "Accompany the sign with appropriate facial expression."
        ]
    elif category_id == "fruits":
        desc = f"Sign the fruit '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Form the handshape representing the fruit's shape, texture, or eating motion.",
            "Follow the movement path shown in the demonstration video.",
            "Hold the sign cleanly for easy recognition."
        ]
    elif category_id == "profession":
        desc = f"Sign the profession '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Form the occupational sign or tool-miming gesture with your hands.",
            "Follow the specific trajectory and posture shown in the video.",
            "Execute the sign clearly to communicate the vocation."
        ]
    elif category_id == "vegetables":
        desc = f"Sign the vegetable '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Shape your hand according to the vegetable's physical or culinary sign.",
            "Follow the demonstration video for hand rotation and movement.",
            "Perform the gesture smoothly and clearly."
        ]
    elif category_id == "transactional":
        desc = f"Sign the transaction term '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Position your dominant or both hands at chest level.",
            "Execute the clear transactional motion (e.g. paying, receiving, counting).",
            "Maintain polite, professional facial expression and hand clarity."
        ]
    else:
        desc = f"Sign '{title}' in Filipino Sign Language (FSL)."
        steps = [
            "Form the hand shape as demonstrated in the guide.",
            "Follow the direction and hand movement shown in the demonstration.",
            "Execute the sign repeatedly for muscle memory and accuracy."
        ]
    return desc, steps

def generate_js():
    print(f"Reading labels from: {LABELS_PATH}")
    
    categories = []
    lessons = []
    seen_cats = set()
    
    with open(LABELS_PATH, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            lbl_id = row['id']
            eng_label = row['label']
            eng_category = row['category']
            
            # Map Category
            cat_cfg = category_mapping.get(eng_category)
            if not cat_cfg:
                print(f"Warning: Unknown category {eng_category}")
                continue
                
            if cat_cfg['id'] not in seen_cats:
                categories.append(cat_cfg)
                seen_cats.add(cat_cfg['id'])
                
            # Filipino Sign Title (as requested: word remains Filipino if there is a Filipino word)
            clean_label = eng_label.strip()
            filipino_title = tagalog_alias_map.get(clean_label, clean_label.title())
            english_meaning = english_title_map.get(clean_label, clean_label.title())
            
            # Find video file in clips/lbl_id/
            lbl_clips_dir = os.path.join(CLIPS_DIR, lbl_id)
            video_file = "0.MOV" # Fallback
            if os.path.isdir(lbl_clips_dir):
                files = [f for f in os.listdir(lbl_clips_dir) if f.lower().endswith(('.mov', '.mp4'))]
                if files:
                    if "0.MOV" in files:
                        video_file = "0.MOV"
                    elif "0.mov" in files:
                        video_file = "0.mov"
                    else:
                        files.sort()
                        video_file = files[0]
                        
            animation_path = f"/fsl-105-dataset/clips/{lbl_id}/{video_file}"
            desc, steps = get_steps_and_desc(cat_cfg['id'], filipino_title)
            
            lesson = {
                "id": f"lesson_{lbl_id}",
                "categoryId": cat_cfg['id'],
                "title": filipino_title,
                "englishTitle": english_meaning,
                "tagalogTitle": filipino_title,
                "description": desc,
                "steps": steps,
                "animation": animation_path
            }
            lessons.append(lesson)
            
    # Add Alphabet Category after Days
    days_idx = next((i for i, c in enumerate(categories) if c['id'] == 'days'), len(categories) - 1)
    categories.insert(days_idx + 1, alphabet_category)
    
    # Add Alphabet Lessons (A-Z, ids 105-130)
    letters = [chr(i) for i in range(ord('A'), ord('Z')+1)]
    for i, letter in enumerate(letters):
        lesson_id = 105 + i
        desc, steps = get_steps_and_desc("alphabet", letter)
        lesson = {
            "id": f"lesson_{lesson_id}",
            "categoryId": "alphabet",
            "title": letter,
            "englishTitle": f"Letter {letter}",
            "tagalogTitle": f"Letrang {letter}",
            "description": desc,
            "steps": steps,
            "animation": f"/fsl_alphabet_sign/fsl_alphabet_sign/{letter}.png"
        }
        lessons.append(lesson)
            
    # Add Custom FSL Categories and Lessons
    CUSTOM_DIR = os.path.join(BASE_DIR, "custom_fsl")
    custom_categories_cfg = [
        {"id": "animals", "name": "Animals", "icon": "🐾", "folder": "Animals"},
        {"id": "body_parts", "name": "Body Parts", "icon": "👤", "folder": "Body Parts"},
        {"id": "emotion", "name": "Emotion", "icon": "😊", "folder": "Emotion"},
        {"id": "fruits", "name": "Fruits", "icon": "🍎", "folder": "Fruits"},
        {"id": "profession", "name": "Profession", "icon": "💼", "folder": "Profession"},
        {"id": "vegetables", "name": "Vegetables", "icon": "🥦", "folder": "Vegetables"},
    ]

    custom_words_info = {
        # Animals
        "Bird": {"filipino": "Ibon", "english": "Bird"},
        "Cat": {"filipino": "Pusa", "english": "Cat"},
        "Dog": {"filipino": "Aso", "english": "Dog"},
        "Horse": {"filipino": "Kabayo", "english": "Horse"},
        "Pig": {"filipino": "Baboy", "english": "Pig"},
        # Body Parts
        "Ears": {"filipino": "Tainga", "english": "Ears"},
        "Eyes": {"filipino": "Mata", "english": "Eyes"},
        "Hair": {"filipino": "Buhok", "english": "Hair"},
        "Hand": {"filipino": "Kamay", "english": "Hand"},
        "Mouth": {"filipino": "Bibig", "english": "Mouth"},
        "Nose": {"filipino": "Ilong", "english": "Nose"},
        "Teeth": {"filipino": "Ngipin", "english": "Teeth"},
        # Emotion
        "Angry": {"filipino": "Galit", "english": "Angry"},
        "Happy": {"filipino": "Masaya", "english": "Happy"},
        "Sad": {"filipino": "Malungkot", "english": "Sad"},
        "Scared": {"filipino": "Takot", "english": "Scared"},
        "Shy": {"filipino": "Mahiyain", "english": "Shy"},
        # Fruits
        "Banana": {"filipino": "Saging", "english": "Banana"},
        "Coconut": {"filipino": "Niyog", "english": "Coconut"},
        "Mango": {"filipino": "Mangga", "english": "Mango"},
        "Pineapple": {"filipino": "Pinya", "english": "Pineapple"},
        "Watermelon": {"filipino": "Pakwan", "english": "Watermelon"},
        # Profession
        "Chef": {"filipino": "Kusinero", "english": "Chef"},
        "Doctor": {"filipino": "Doktor", "english": "Doctor"},
        "Engineer": {"filipino": "Inhinyero", "english": "Engineer"},
        "Firefighter": {"filipino": "Bumbero", "english": "Firefighter"},
        "Nurse": {"filipino": "Nars", "english": "Nurse"},
        "Plumber": {"filipino": "Tubero", "english": "Plumber"},
        "Police": {"filipino": "Pulis", "english": "Police"},
        "Principal": {"filipino": "Punong-Guro", "english": "Principal"},
        "Programmer": {"filipino": "Programmer", "english": "Programmer"},
        "Teacher": {"filipino": "Guro", "english": "Teacher"},
        # Vegetables
        "Corn": {"filipino": "Mais", "english": "Corn"},
        "Cucumber": {"filipino": "Pipino", "english": "Cucumber"},
        "Onions": {"filipino": "Sibuyas", "english": "Onions"},
        "Potato": {"filipino": "Patatas", "english": "Potato"},
        "Tomato": {"filipino": "Kamatis", "english": "Tomato"}
    }

    current_lesson_id = 131

    for cat_cfg in custom_categories_cfg:
        categories.append({"id": cat_cfg["id"], "name": cat_cfg["name"], "icon": cat_cfg["icon"]})
        cat_dir = os.path.join(CUSTOM_DIR, cat_cfg["folder"])
        if os.path.isdir(cat_dir):
            signs = sorted([s for s in os.listdir(cat_dir) if os.path.isdir(os.path.join(cat_dir, s))])
            for sign in signs:
                info = custom_words_info.get(sign, {"filipino": sign, "english": sign})
                sign_dir = os.path.join(cat_dir, sign)
                vids = sorted([f for f in os.listdir(sign_dir) if f.lower().endswith(('.mp4', '.mov', '.avi'))])
                anim = f"/custom_fsl/{cat_cfg['folder']}/{sign}/{vids[0]}" if vids else ""
                desc, steps = get_steps_and_desc(cat_cfg["id"], info["filipino"])

                lesson = {
                    "id": f"lesson_{current_lesson_id}",
                    "categoryId": cat_cfg["id"],
                    "title": info["filipino"],
                    "englishTitle": info["english"],
                    "tagalogTitle": info["filipino"],
                    "description": desc,
                    "steps": steps,
                    "animation": anim
                }
                lessons.append(lesson)
                current_lesson_id += 1

    # Add Transactional FSL Category
    transactional_category = {"id": "transactional", "name": "Transactional FSL", "icon": "💳"}
    # categories.append(transactional_category)

    transactional_words_info = {
        "AGAIN": {"filipino": "Ulitin / Muli", "english": "Again"},
        "CARD": {"filipino": "Kard", "english": "Card"},
        "CASH": {"filipino": "Pera / Cash", "english": "Cash"},
        "COIN": {"filipino": "Barya", "english": "Coin"},
        "DISCOUNT": {"filipino": "Diskwento", "english": "Discount"},
        "EIGHT": {"filipino": "Walo", "english": "Eight"},
        "FIVE": {"filipino": "Lima", "english": "Five"},
        "FOUR": {"filipino": "Apat", "english": "Four"},
        "HELLO": {"filipino": "Hello / Kamusta", "english": "Hello"},
        "HOW_MANY": {"filipino": "Ilan", "english": "How Many"},
        "HOW_MUCH": {"filipino": "Magkano", "english": "How Much"},
        "NINE": {"filipino": "Siyam", "english": "Nine"},
        "NO": {"filipino": "Hindi", "english": "No"},
        "ONE": {"filipino": "Isa", "english": "One"},
        "PLEASE": {"filipino": "Pakiusap", "english": "Please"},
        "PROBLEM": {"filipino": "Problema", "english": "Problem"},
        "RECEIPT": {"filipino": "Resibo", "english": "Receipt"},
        "SEVEN": {"filipino": "Pito", "english": "Seven"},
        "SIX": {"filipino": "Anim", "english": "Six"},
        "TEN": {"filipino": "Sampu", "english": "Ten"},
        "THANK_YOU": {"filipino": "Salamat", "english": "Thank You"},
        "THREE": {"filipino": "Tatlo", "english": "Three"},
        "TWO": {"filipino": "Dalawa", "english": "Two"},
        "WAIT": {"filipino": "Sandali / Hintay", "english": "Wait"},
        "WELCOME": {"filipino": "Walang Anuman", "english": "Welcome"},
        "YES": {"filipino": "Oo", "english": "Yes"}
    }

    for trans_label, info in transactional_words_info.items():
        desc, steps = get_steps_and_desc("transactional", info["filipino"])
        lesson = {
            "id": f"lesson_{current_lesson_id}",
            "categoryId": "transactional",
            "title": info["filipino"],
            "englishTitle": info["english"],
            "tagalogTitle": info["filipino"],
            "description": desc,
            "steps": steps,
            "animation": f"/transactional/recorded_data/{trans_label}"
        }
        lessons.append(lesson)
        current_lesson_id += 1
            
    # --- ADD ADDITIONAL-SL ---
    additional_sl_categories = [
        {"id": "adjective", "name": "Adjective", "icon": "✨"},
        {"id": "bible", "name": "Bible", "icon": "📖"},
        {"id": "places", "name": "Places", "icon": "📍"},
        {"id": "prepositions", "name": "Prepositions", "icon": "🗺️"},
        {"id": "verb", "name": "Verb", "icon": "🏃"},
    ]
    
    translations = {
        "BAD": "MASAMA", "BEAUTIFUL": "MAGANDA", "GOOD": "MABUTI", "HAPPY": "MASAYA", "UGLY": "PANGIT",
        "ADAM": "ADAN", "EVE": "EBA", "GOD": "DIYOS", "JESUS": "HESUS", "MARY": "MARIA",
        "BATHROOM": "BANYO", "CHURCH": "SIMBAHAN", "HOME": "BAHAY", "HOSPITAL": "OSPITAL", "SCHOOL": "PAARALAN",
        "ABOVE": "SA ITAAS", "BEFORE": "BAGO", "BEHIND": "SA LIKOD", "INSIDE": "SA LOOB", "OUTSIDE": "SA LABAS",
        "EAT": "KAIN", "HELP": "TULONG", "NEED": "KAILANGAN", "WAIT": "HINTAY", "WANT": "GUSTO"
    }

    base_dir = os.path.join(BASE_DIR, "additional-sl")
    for cat_cfg in additional_sl_categories:
        categories.append(cat_cfg)
        cat_folder = cat_cfg["name"]
        cat_dir = os.path.join(base_dir, cat_folder)
        if os.path.isdir(cat_dir):
            for sign_name in os.listdir(cat_dir):
                sign_path = os.path.join(cat_dir, sign_name)
                if os.path.isdir(sign_path):
                    for file_name in os.listdir(sign_path):
                        if file_name.lower().endswith(('_01.mp4', '_01.mov', '_01.webm')):
                            import re
                            clean_name = re.sub(r'(?i)_01\.(mp4|mov|webm)$', '', file_name)
                            clean_name = clean_name.replace('_', ' ').title()
                            
                            lesson = {
                                "id": f"lesson_{current_lesson_id}",
                                "categoryId": cat_cfg["id"],
                                "title": clean_name,
                                "englishTitle": clean_name,
                                "tagalogTitle": clean_name,
                                "description": f"Sign the word '{clean_name}' in Filipino Sign Language (FSL).",
                                "steps": [
                                    "Raise your dominant hand to initiate the sign.",
                                    "Mirror the hand movement and facial expression shown in the video.",
                                    "Face your palm outward toward the viewer with a clear gesture."
                                ],
                                "animation": f"/additional-sl/{cat_folder}/{sign_name}/{file_name}"
                            }
                            lessons.append(lesson)
                            print(f"Added lesson: {lesson['title']}")
                            current_lesson_id += 1
                            break
                        else:
                            print(f"Skipped file: {file_name}")
                else:
                    print(f"Not a dir: {sign_path}")
        else:
            print(f"Not a dir: {cat_dir}")
                            
    # Build seed.js file content
    js_content = f"""// Seeding data for FSL Learning Categories and Lessons (Generated)
async function seedDatabase() {{
    console.log("Seeding IndexedDB database with English curriculum...");

    const categories = {json.dumps(categories, indent=8, ensure_ascii=False)};

    const lessons = {json.dumps(lessons, indent=8, ensure_ascii=False)};

    try {{
        const db = await getDB();
        // Clear old stores to ensure clean state
        await new Promise((resolve) => {{
            const tx = db.transaction(["categories", "lessons"], "readwrite");
            tx.objectStore("categories").clear();
            tx.objectStore("lessons").clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => resolve();
        }});
    }} catch (err) {{
        console.warn("Notice: clearing stores before seed:", err);
    }}

    // Bulk insert categories
    for (const cat of categories) {{
        try {{
            await saveCategory(cat);
        }} catch (e) {{
            console.error("Error seeding category:", cat.id, e);
        }}
    }}

    // Bulk insert lessons
    for (const les of lessons) {{
        try {{
            await saveLesson(les);
        }} catch (e) {{
            console.error("Error seeding lesson:", les.id, e);
        }}
    }}

    console.log("IndexedDB database seeding complete.");
}}
"""
    with open(SEED_JS_PATH, mode='w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully generated seed data script at: {SEED_JS_PATH}")
    print(f"Total categories: {len(categories)}")
    print(f"Total lessons: {len(lessons)}")

if __name__ == "__main__":
    generate_js()
