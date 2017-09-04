target = index.html

include ../notes.new/private_for_turingwasright.com.mk

editor = vi

commit_message = /tmp/commit_message.txt
get_commit_message = get_commit_message.sh
github_level = ~/thesis/github/

all:
	@echo "Use make upload to copy HTML to web server."

upload: $(target)
	scp $< $(private_web_server_for_turingwasright):
	ssh -t $(private_web_server_for_turingwasright) sudo mv $< www
	ssh -t $(private_web_server_for_turingwasright) sudo chown www:www www/$<
	ssh -t $(private_web_server_for_turingwasright) ls -l www/

vi:
	$(editor) $(target)

$(commit_message): $(get_commit_message)
	@./$(get_commit_message)

#
# make symlink to shell scripts if they don't already exist
#

$(get_commit_message):
	ln -fs ../Makefiles/$(get_commit_message)
	chmod u+x $(get_commit_message)

commit:
	git add $(target) Makefile
	make $(commit_message)
	git commit -F $(commit_message)
	rm -fv $(commit_message)
	git push

ssh:
	ssh $(private_web_server_for_turingwasright)

notes:
	(cd $(github_level)/notes.new/ && make vi)

quotes:
	(cd $(github_level)/notes.new/ && make quotes)

bib:
	(cd $(github_level)/bibtex/ && make vi)

