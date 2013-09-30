require 'flickr'

flickr = Flickr.new('3e45e1a7bb4219c06295fd0a6f451fc0')    # create a flickr client

recentphotos = flickr.photos

puts recentphotos.size