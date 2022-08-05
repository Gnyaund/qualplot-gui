import time
import sys
import json
def main():
    print("Execute")
    jopen = open("./json/qualplot.json", "r")
    config = json.load(jopen)
    QUALNET_PATH = config["qualnet_path"]
    
    start = config["start_seed"]
    end = config["end_seed"]
    node = config["max_node"]
    print(QUALNET_PATH, start, end, node)
    time.sleep(3)
    sys.exit(0)


if __name__ == "__main__":
    main()

    