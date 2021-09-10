---
layout: post
author: mechanical duck
title: Telepresence completes the metaverse
description: I like to think of telepresence as the dual of virtual reality. Whereas VR lets you immerse yourself into an immaterial virtual world, telepresence lets you beam into a physical (meatspace) world that's far away or inaccessible.
---

One of my favorite projects at Mars College last year was our telepresence robot. <a href="https://phillipstearns.com/">Phil</a>, <a href="https://www.linkedin.com/in/sebastian-quinard-40b5811a3">Sebastian</a>, and I joined forces to build the "Mars Rover."

{% include figure.md path="/images/blog/rover-on-mars.jpg" caption="Rover (photo by <a href=\"https://phillipstearns.com/\">Phil Stearns</a>)" %}

The little tank you see was not just a conventional electric vehicle. It was equipped with two back-to-back fisheye cameras streaming a full 360-degree view of the world to a Jetson Nano microcontroller ziptied to the frame of the rover. We wrote <a href="https://www.github.com/mars-college/mars-rover">some software</a> which stitched the two cameras into equirectangular format and live-streamed it through a websocket. From there, a remote observer could watch the stream inside a VR headset or on a smartphone. Because we streamed the full 360 degrees, there was no latency in head motion. It felt almost like you were really there, seeing what the rover saw.

## The metaverse needs telepresence 

I like to think of telepresence as <a href="https://en.wikipedia.org/wiki/Duality_(mathematics)">the dual</a> of virtual reality. Whereas VR lets you immerse yourself into an immaterial virtual world, telepresence lets you beam into a physical (meatspace) world that's far away or inaccessible.

In the early months of the pandemic, the metaverse became a subject of interest. As people flocked to online social spaces, it kickstarted a great deal of innovation, the seedlings of which we are just starting to see now. But fatigue also set in, as virtual spaces struggled to fill the void of physical social spaces. Meatspace does have its own charms, and many people missed it.

Meanwhile, on Mars, we had the opposite problem. Despite the state of the world, sharing time with our friends in meatspace was the norm, with <a href="/join">campfires, group meals, IRL workshops</a>, and all that. But our group was quite isolated in the desert, and we were less active online than we had planned to be.

Telepresence is the natural bridge between these two extremes of physical presence and virtual reality. Imagine a "Second Life"-type virtual world which runs parallel to the "real world." You navigate a digital maze on your computer, or in your headset, or in the Matrix, and at any point, like Star Trek you can teleport into your digital neighborhood's analogue counterpart. Like a virtual bazaar in which every little stall took you somewhere special on Earth.

## Our telepresence project is just beginning

Last year, we figured out the <a href="https://www.github.com/mars-college/mars-rover">software component</a>. I found a very nice writeup by <a href="http://paulbourke.net/dome/2fish/">Paul Bourke</a> explaining how to map dual fisheye cameras to equirectangular (the format needed by VR headsets), and ported it into a shader and streamed it via websocket.

{% include figure.md path="/images/blog/lobby.jpg" caption="Equirectangular format (image from <a href=\"http://paulbourke.net/dome/2fish/\">Paul Bourke's blog</a>)" %}

Now we're ready to deploy it. We're dreaming of installing it into various form factors: drones, electric vehicles, helmets, and of course our rover. We want to strap a telepresence rig on top of a giant rover that explores the furthest reaches of the desert. Maybe it brings us back soil samples, so we can decide whether or not these faraway lands around us can be inhabited by more humans.

We are looking for enthusiasts to come join us at Mars College and help us advance this project. We'd like to build a prototype rig that consists of two back-to-back fisheye cameras, a computer or microcontroller running our software, and battery pack which can be integrated into various form factors, including helmets, drones, electric vehicles, or other mobile things. We'd like to deploy them into the wild so they may roam around the desert and transmit their findings back to us on Mars. Lastly, we are interested in exploring the possibility of spinning this off Mars College and into its own enterprise.

If this project inspires you, we'd love to hear from you. Consider <a href="/join">applying for the upcoming quarter</a>, or reaching out to us on <a href="https://twitter.com/mars_college">Twitter</a>, <a href="https://instagram.com/mars.college">Instagram</a>, or by <a href="mailto:info@mars.college">E-mail</a>.



