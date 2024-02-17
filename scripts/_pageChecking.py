import os
import json

def create_folder_structure(path):
    folder_structure = []
    for entry in os.scandir(path):
        if entry.name == ".git": continue
        if entry.is_dir():
            folder = {
                "name": entry.name,
                "folders": create_folder_structure(entry.path)
            }
            files = [f.name for f in os.scandir(entry.path) if f.is_file()]
            folder["files"] = files
            folder_structure.append(folder)
    return folder_structure

path_to_folder = "Pages"
main_folder = create_folder_structure(path_to_folder)

js_object = json.dumps(main_folder, indent=4)

file = open("scripts/pageChecking.js", 'w')
file.write("var existentPages = ")
file.write(js_object)
file.write(";\n\n\n\n")

pc = open("scripts/_pageChecking.js", 'r')
file.write(pc.read())
pc.close()

file.close()