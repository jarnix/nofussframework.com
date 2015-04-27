# Try it now with Vagrant

Since we are so kind with you, we built a VM which you can play with, so you can get on board quickly.

The VM contains the same code as in the github repository but also a preconfigured apache + php + mysql + memcache + apcu, and some php extensions that you can use at the beginning.

## Vagrant setup

If you don't have Vagrant on your computer, download it from here:

[https://www.vagrantup.com/downloads.html](https://www.vagrantup.com/downloads.html "https://www.vagrantup.com/downloads.html")

## Virtualbox setup

The image for Vagrant uses Virtualbox. Download it from here:

[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads "https://www.virtualbox.org/wiki/Downloads")

## Start the vm with NoFussFramework:

Download the Vagrant settings for our image. Go into your home folder for example and clone this git repository:

	git clone https://github.com/jarnix/nofussvagrant.git

Then go into the nofussvagrant directory and start the VM with:

    vagrant up

The first time it will take a few minutes to download the image of the VM.

Open your browser:

	http://localhost:8888

## Modify the sources in the VM:

	vagrant ssh
	
The files are located in /var/www/nofuss/demosite
