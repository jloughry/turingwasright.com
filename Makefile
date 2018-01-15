target = index.html

CDSEE = ./CDSEE/CDSEE

sim = $(CDSEE)_multiple_window.html
js  = $(CDSEE)_multiple_window.js
css = $(CDSEE).css

include ../notes.new/private_for_turingwasright.com.mk

editor = vi

all::
	@echo "Use make upload to copy index.html to web server."
	@echo "Use make upload-all to re-copy everything."

clean::
	@echo "This is clean in the local Makefile"

website_directory = www/turingwasright.com/

upload: $(target)
	scp $< $(private_web_server_for_turingwasright):
	ssh -t $(private_web_server_for_turingwasright) sudo mv \
		$< $(website_directory)
	ssh -t $(private_web_server_for_turingwasright) sudo chown www:www \
		$(website_directory)$<
	ssh -t $(private_web_server_for_turingwasright) ls -l \
		$(website_directory)
	@echo
	@echo "Remember: this only uploads the file index.html to the web server."

all_website_files = index.html mu.css \
	favicon.ico favicon-16x16.png favicon-32x32.png \
	android-chrome-192x192.png android-chrome-512x512.png manifest.json \
	apple-touch-icon.png safari-pinned-tab.svg \
	mstile-150x150.png browserconfig.xml

upload-all:
	scp $(all_website_files) $(private_web_server_for_turingwasright):
	ssh -t $(private_web_server_for_turingwasright) sudo mv \
		$(all_website_files) $(website_directory)
	ssh -t $(private_web_server_for_turingwasright) sudo chown www:www \
		$(website_directory)\*
	ssh -t $(private_web_server_for_turingwasright) ls -l \
		$(website_directory)

upload_all: upload-all

vi:
	$(editor_cmd) $(target)

sim:
	$(editor_cmd) $(sim)

html: sim

css:
	$(editor_cmd) $(css)

js:
	$(editor_cmd) $(js)

$(commit_message): $(get_commit_message)
	@./$(get_commit_message)

$(get_commit_message):
	ln -fs ../Makefiles/$(get_commit_message)
	chmod u+x $(get_commit_message)

ssh:
	ssh $(private_web_server_for_turingwasright)

include common.mk

