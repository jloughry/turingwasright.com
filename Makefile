target = index.html

include ../notes.new/private_for_turingwasright.com.mk

editor = vi

all::
	@echo "Use make upload to copy HTML to web server."

clean::
	@echo "This is clean in the local Makefile"

upload: $(target)
	scp $< $(private_web_server_for_turingwasright):
	ssh -t $(private_web_server_for_turingwasright) sudo mv $< www
	ssh -t $(private_web_server_for_turingwasright) sudo chown www:www www/$<
	ssh -t $(private_web_server_for_turingwasright) ls -l www/

vi:
	$(editor_cmd) $(target)

$(commit_message): $(get_commit_message)
	@./$(get_commit_message)

$(get_commit_message):
	ln -fs ../Makefiles/$(get_commit_message)
	chmod u+x $(get_commit_message)

ssh:
	ssh $(private_web_server_for_turingwasright)

include common.mk

