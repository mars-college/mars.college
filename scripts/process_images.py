from PIL import Image
import collections
import re
import json
import os
from datetime import datetime
from tqdm import tqdm
import cv2



height_small = 300
height_large = 400


    
data_path = '../_data/gallery.json'
image_dir = '../images/gallery/'
thumbs_dir = '../images/gallery/thumb/'
lookup_path = 'gdrive_lookup.json'
dropbox_file = 'dropbox_lookup.json'
overwrite = False


def process_entry(data, d):
    entry = data[d]
    path = '%s/%s'%(image_dir, entry['name'])
    save_path = path.replace('gallery/', 'gallery/thumb/')

    if entry['type'] == 'video':
        vid = cv2.VideoCapture(path)
        w, h = vid.get(cv2.CAP_PROP_FRAME_WIDTH), vid.get(cv2.CAP_PROP_FRAME_HEIGHT)
        if 'reverse' in entry:
            w, h = h, w
        entry['size'] = [int(w), int(h)]
        sec1, sec2 = entry['interval']
        duration = sec2-sec1
        t1 = datetime.now().replace(hour=0, minute=int(sec1/60), second=sec1%60)
        delta = datetime.now().replace(hour=0, minute=int(duration/60), second=duration%60)    
        h2 = height_small if h<w else height_large
        w2 = int(h2*w/h)
        w2 = w2-1 if w2%2==1 else w2
        cmd = [
            'ffmpeg', 
            '-ss', t1.strftime("%H:%M:%S"), 
            '-i', path, 
            '-c:v', 'libx264',
            '-pix_fmt', 'yuv420p', 
            '-t', delta.strftime("%H:%M:%S"),
            '-vf', 'scale=%d:%d'%(w2, h2),
            save_path]

        # -movflags faststart 
        #type="video/mp4; codecs=hevc"
        cmd = [
            'ffmpeg', 
            '-y',
            '-ss', t1.strftime("%H:%M:%S"), 
            '-an',
            '-i', path, 
            '-vcodec', 'libx264',
            '-pix_fmt', 'yuv420p', 
            '-t', delta.strftime("%H:%M:%S"),
            '-profile:v baseline -level 3',
            '-vf', 'scale=%d:%d'%(w2, h2),
            save_path]

        cmd = ' '.join(cmd)
        print(cmd)
        
        if os.path.isfile(save_path):
            print("skipping %s"%save_path)
        else:
            os.system(cmd)     

    elif entry['type'] == 'photo':
        img = Image.open(path)
        w, h = img.width, img.height
        h2 = height_small if w > h else height_large
        img = img.resize((int(h2*w/h), h2), Image.BICUBIC)
        entry['size'] = [int(w), int(h)]
        if os.path.isfile(save_path):
            print("skipping %s"%save_path)
        else:
            img.save(save_path)


def lineup_gdrive_links():
    data = json.loads(open(data_path, 'rb').read())
    images = data['images']
    lookup = json.loads(open(lookup_path, 'rb').read())
    gdrive_files = list(set(lookup.keys()))
    local_files = list(set([img['name'] for img in images]))
    images_non_gdrive = [f for f in local_files if f not in gdrive_files]
    duplicates = [item for item, count in collections.Counter([img['name'] for img in images]).items() if count > 1]
    for d in tqdm(range(len(images))):
        images[d]['gdrive'] = lookup[images[d]['name']]
    json_file = open("results.json", "w")
    data['images'] = images
    json_file.write(json.dumps(data, indent=4))
    json_file.close()
    

def make_thumbnails():
    data = json.loads(open(data_path, 'rb').read())
    images = data['images']
    for d in tqdm(range(len(images))):
        process_entry(images, d)
    data['images'] = images
    json_file = open("results.json", "w")
    json_file.write(json.dumps(data, indent=4))
    json_file.close()

def lineup_dropbox_links():
    data = json.loads(open(data_path, 'rb').read())
    db = json.loads(open(dropbox_file, 'rb').read())
    images = data['images']
    file_names = list(db.keys())
    image_names = list(set([img['name'] for img in images]))
    missing = [im for im in image_names if im not in file_names and im.split('.')[-1].lower() == 'mp4']
    print("missing:", missing)
    for img in images:
        name = img['name']
        if name in file_names:
            img['dropbox'] = db[name]
    data['images'] = images
    json_file = open("results.json", "w")
    json_file.write(json.dumps(data, indent=4))
    json_file.write(json.dumps(data, indent=4))


#lineup_gdrive_links()
#lineup_dropbox_links()
make_thumbnails()


