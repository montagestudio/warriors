# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provision "docker" do |d|
    d.build_image "/vagrant",
        args: "-t 'warriors/postgres' -f /vagrant/docker/postgres/Dockerfile"
    d.build_image "/vagrant",
        args: "-t 'warriors/server' -f /vagrant/docker/server/Dockerfile"
    d.run "warriors/postgres",
        args: "-p 5432:5432"
    d.run "warriors/server",
        args: "-p 3000:3000 --link warriors-postgres:postgres"
  end

  config.vm.provision "shell",
    inline: "docker exec warriors-server /srv/configure_warriors.sh"

  config.vm.network "forwarded_port", guest: 3000, host: 3000
end
