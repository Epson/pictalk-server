# Message Object, including soung, text and maybe img later.
# Default-encode: UTF-8

message =
	pt-id: '' # Belonging to which PTKObject
	msg-id: \pt-id+msg-index # pt-id ++ msg-index
	msg-index: 1 	# count 1
	msg-body: # only one kind, 2 examples ->
	*	type: \text
		content: 'Hello, World!'
		url: ''		# Needed for resources or longtext maybe.
	*	type: \sound
		content: ''		# Binary text maybe?
		url: '/home/sdcard/pictalk/message/20130328/{#picid}/sounds/54e2d3as.ogg'

  sender: \lhfcws@gmail.com	# user id
  receiver: \chenxj@foxmail.com # user id
	time:	'2013-03-28-09-50-43'	# Any time format is ok. If better to be easy to read and parse.
	anchor:	# An anchor object. We use a point to be the center point of the square. The size of square will be defined in #Config.
	* center-x: 100 # px
	  center-y: 100 # px

