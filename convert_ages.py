import json
import re

def parse_age_to_days(age_str: str) -> int:
    """
    Convert age strings like "5 місяців", "1.5 року", "2 тижні" to integer days.
    - Years -> 365 days
    - Months -> 30 days
    - Weeks -> 7 days
    """
    # Extract numeric value (handles integers and floats)
    match = re.search(r"([\d\.]+)", age_str)
    if not match:
        return 0
    num = float(match.group(1))
    # Determine unit
    if "рік" in age_str or "рок" in age_str:
        days = num * 365
    elif "місяц" in age_str:
        days = num * 30
    elif "тижн" in age_str:
        days = num * 7
    else:
        days = num
    return int(round(days))

def transform_ages(input_path: str, output_path: str):
    # Load original JSON
    with open(input_path, "r", encoding="utf-8") as f:
        pets = json.load(f)

    # Transform each pet entry
    for pet in pets:
        age_str = pet.get("age", "")
        pet["ageInDays"] = parse_age_to_days(age_str)
        pet.pop("age", None)

    # Save the transformed data
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(pets, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    INPUT_FILE = r"src\pets.json"  # path to your original JSON file
    OUTPUT_FILE = "pets_with_ageInDays.json"
    transform_ages(INPUT_FILE, OUTPUT_FILE)
    print(f"Transformed JSON saved to {OUTPUT_FILE}")