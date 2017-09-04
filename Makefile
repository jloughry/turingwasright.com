include ../notes.new/private_for_turingwasright.com.mk

upload: index.html
	scp $< $(private_web_server_for_turingwasright):
	ssh -t $(private_web_server_for_turingwasright) sudo mv $< www
	ssh -t $(private_web_server_for_turingwasright) sudo chown www:www www/$<
	ssh -t $(private_web_server_for_turingwasright) ls -l www/

