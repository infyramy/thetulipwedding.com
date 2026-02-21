#!/usr/bin/env python3
"""
Bulk replace all old image paths with new clean image paths.
Run from project root.
"""

import os
import re

# Map of old path substring -> new path
REPLACEMENTS = [
    # --- Logo ---
    ('/assets/LOGO THE TULIP AI (1).svg',   '/assets/images/logo/logo-tulip-full.svg'),
    ('/assets/LOGO THE TULIP AI (2).svg',   '/assets/images/logo/logo-tulip-icon.svg'),

    # --- About page bg ---
    ('/assets/kenalikami.jpeg',             '/assets/images/hero/about-team-bg.jpg'),

    # --- Contact page ---
    ('/assets/FHP_0297.jpg',               '/assets/images/hero/hero-contact-bg.jpg'),
    ('/assets/dtulips 2.jpg',              '/assets/images/contact/boutique-exterior-02.jpg'),
    ('/assets/dtulips.jpg',                '/assets/images/contact/boutique-exterior-01.jpg'),
    ('/assets/k-frontstore.jpeg',           '/assets/images/contact/boutique-frontstore.jpg'),
    ('/assets/k-indoor.jpeg',               '/assets/images/contact/boutique-indoor.jpg'),

    # --- Hero / general ---
    ('/assets/AIMN9527.jpg',               '/assets/images/hero/hero-wedding-01.jpg'),
    ('/assets/FHP_0022.jpg',               '/assets/images/hero/hero-wedding-02.jpg'),
    ('/assets/FHP_0111.jpg',               '/assets/images/hero/hero-wedding-03.jpg'),
    ('/assets/FHP_0255.jpg',               '/assets/images/hero/hero-wedding-04.jpg'),
    ('/assets/IMG_9575.jpg',               '/assets/images/hero/hero-wedding-05.jpg'),
    ('/assets/IMG_9603.jpg',               '/assets/images/hero/hero-wedding-06.jpg'),
    ('/assets/IMG_9607.jpg',               '/assets/images/hero/hero-wedding-07.jpg'),
    ('/assets/MSY_3223.jpg',               '/assets/images/hero/hero-wedding-08.jpg'),
    ('/assets/MSY_9176.jpg',               '/assets/images/hero/hero-wedding-09.jpg'),
    ('/assets/MSY_9182.jpg',               '/assets/images/hero/hero-wedding-10.jpg'),
    ('/assets/MSY_9586.jpg',               '/assets/images/hero/hero-wedding-11.jpg'),
    ('/assets/KHR-24.jpg',                 '/assets/images/hero/hero-hall-bg.jpg'),
    ('/assets/KHR-266.jpg',               '/assets/images/hero/kanopi-setup-01.jpg'),
    ('/assets/KHR-272.jpg',               '/assets/images/hero/kanopi-setup-02.jpg'),
    ('/assets/KHR-30.jpg',                '/assets/images/hero/kanopi-setup-03.jpg'),
    ('/assets/KHR-421.jpg',               '/assets/images/hero/kanopi-setup-04.jpg'),

    # --- Bridal ---
    ('/assets/IMG_2257.jpg',               '/assets/images/bridal/bridal-boutique-01.jpg'),
    ('/assets/IMG_2343.jpg',               '/assets/images/bridal/bridal-boutique-02.jpg'),
    ('/assets/K7300415.jpg',               '/assets/images/bridal/decoration-pelamin-01.jpg'),
    ('/assets/K7309359.jpg',               '/assets/images/bridal/decoration-pelamin-02.jpg'),
    ('/assets/k-1.jpeg',                   '/assets/images/bridal/bridal-showcase-01.jpg'),
    ('/assets/k-2.jpeg',                   '/assets/images/bridal/bridal-showcase-02.jpg'),
    ('/assets/k-3.jpeg',                   '/assets/images/bridal/bridal-showcase-03.jpg'),
    ('/assets/k-onsite1.jpeg',             '/assets/images/bridal/bridal-onsite-01.jpg'),

    # --- Hall: Laman Puteri ---
    ('/assets/hall/lamanputeri/hall laman puteri1.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-01.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri2.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-02.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri3.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-03.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri4.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-04.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri5.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-05.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri6.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-06.jpg'),
    ('/assets/hall/lamanputeri/hall laman puteri7.jpeg',  '/assets/images/hall/laman-puteri/laman-puteri-07.jpg'),

    # --- Hall: Kluang Glasshouse ---
    ('/assets/hall/kluang container/kluang container hotel1.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-01.jpg'),
    ('/assets/hall/kluang container/kluang container hotel2.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-02.jpg'),
    ('/assets/hall/kluang container/kluang container hotel3.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-03.jpg'),
    ('/assets/hall/kluang container/kluang container hotel4.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-04.jpg'),
    ('/assets/hall/kluang container/kluang container hotel5.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-05.jpg'),
    ('/assets/hall/kluang container/kluang container hotel6.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-06.jpg'),
    ('/assets/hall/kluang container/kluang container hotel7.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-07.jpg'),
    ('/assets/hall/kluang container/kluang container hotel8.jpeg',  '/assets/images/hall/kluang-glasshouse/kluang-glasshouse-08.jpg'),

    # --- Hall: Barokah Sri Village ---
    ('/assets/hall/barokah/barokah sril village1.jpeg',  '/assets/images/hall/barokah-village/barokah-village-01.jpg'),
    ('/assets/hall/barokah/barokah sril village2.jpeg',  '/assets/images/hall/barokah-village/barokah-village-02.jpg'),
    ('/assets/hall/barokah/barokah sril village3.jpeg',  '/assets/images/hall/barokah-village/barokah-village-03.jpg'),
    ('/assets/hall/barokah/barokah sril village4.jpeg',  '/assets/images/hall/barokah-village/barokah-village-04.jpg'),
    ('/assets/hall/barokah/barokah sril village5.jpeg',  '/assets/images/hall/barokah-village/barokah-village-05.jpg'),
    ('/assets/hall/barokah/barokah sril village6.jpeg',  '/assets/images/hall/barokah-village/barokah-village-06.jpg'),
    ('/assets/hall/barokah/barokah sril village7.jpeg',  '/assets/images/hall/barokah-village/barokah-village-07.jpg'),
    ('/assets/hall/barokah/barokah sril village8.jpeg',  '/assets/images/hall/barokah-village/barokah-village-08.jpg'),
    ('/assets/hall/barokah/barokah sril village9.jpeg',  '/assets/images/hall/barokah-village/barokah-village-09.jpg'),
    ('/assets/hall/barokah/barokah sril village10.jpeg', '/assets/images/hall/barokah-village/barokah-village-10.jpg'),
    ('/assets/hall/barokah/barokah sril village11.jpeg', '/assets/images/hall/barokah-village/barokah-village-11.jpg'),
    ('/assets/hall/barokah/barokah sril village12.jpeg', '/assets/images/hall/barokah-village/barokah-village-12.jpg'),

    # --- Hall: Villa Kemboja ---
    ('/assets/hall/villa kemboja/villa kemboja1.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-01.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja2.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-02.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja3.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-03.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja4.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-04.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja5.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-05.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja6.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-06.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja7.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-07.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja8.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-08.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja9.jpeg',  '/assets/images/hall/villa-kemboja/villa-kemboja-09.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja10.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-10.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja11.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-11.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja12.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-12.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja13.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-13.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja14.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-14.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja15.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-15.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja16.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-16.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja17.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-17.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja18.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-18.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja19.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-19.jpg'),
    ('/assets/hall/villa kemboja/villa kemboja20.jpeg', '/assets/images/hall/villa-kemboja/villa-kemboja-20.jpg'),

    # --- Social thumbnails ---
    ('/assets/images/social/ig_DPIbDjgie6Z.jpg',  '/assets/images/social/social-01.jpg'),
    ('/assets/images/social/ig_DPgtJJcCfIb.jpg',  '/assets/images/social/social-02.jpg'),
    ('/assets/images/social/ig_DPnLeCdCcV6.jpg',  '/assets/images/social/social-03.jpg'),
    ('/assets/images/social/ig_DU43ukwEQq8.jpg',  '/assets/images/social/social-04.jpg'),
    ('/assets/images/social/ig_DU9u_4JifI4.jpg',  '/assets/images/social/social-05.jpg'),
    ('/assets/images/social/ig_DUXQN4yiViS.jpg',  '/assets/images/social/social-06.jpg'),
    ('/assets/images/social/ig_DUZWTnrk2qS.jpg',  '/assets/images/social/social-07.jpg'),
    ('/assets/images/social/ig_DUaP_AXE6FD.jpg',  '/assets/images/social/social-08.jpg'),
    ('/assets/images/social/ig_DUeiQYckpKr.jpg',  '/assets/images/social/social-09.jpg'),
    ('/assets/images/social/ig_DUiFLAdCTCr.jpg',  '/assets/images/social/social-10.jpg'),
    ('/assets/images/social/ig_DUua5yFifGT.jpg',  '/assets/images/social/social-11.jpg'),
    ('/assets/images/social/ig_DUxVzCzidXC.jpg',  '/assets/images/social/social-12.jpg'),

    # --- Packages header (MSY_0060) ---
    ('/assets/images/hero/packages-header.jpg',  '/assets/images/hero/packages-header.jpg'),
]

# Source files to update
SOURCE_EXTENSIONS = ('.tsx', '.ts', '.json', '.css')
SOURCE_DIRS = ['.', 'pages', 'components', 'public']

# Files to explicitly include from root/public
EXPLICIT_FILES = [
    'constants.ts',
    'public/social-feed.json',
    'components/Hero.tsx',
    'components/Footer.tsx',
    'components/Header.tsx',
    'components/PageTransition.tsx',
    'pages/Home.tsx',
    'pages/About.tsx',
    'pages/Bridal.tsx',
    'pages/Packages.tsx',
    'pages/Contact.tsx',
    'pages/Hall.tsx',
    'pages/Gallery.tsx',
    'pages/Vendors.tsx',
]

CHANGED_FILES = []

for filepath in EXPLICIT_FILES:
    if not os.path.exists(filepath):
        print(f"  MISSING: {filepath}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  UPDATED: {filepath}")
        CHANGED_FILES.append(filepath)
    else:
        print(f"  no change: {filepath}")

print(f"\n✅ Done! Updated {len(CHANGED_FILES)} files.")
