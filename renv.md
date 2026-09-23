# renv

Este projeto usa {renv} para gerenciar dependências R.

Para inicializar (rode UMA vez no RStudio, na raiz do projeto):

    install.packages("renv")
    renv::init()

Isso cria o renv.lock real. Depois, sempre que instalar um pacote novo:

    renv::snapshot()

O GitHub Action usa esse arquivo para instalar as mesmas versões
dos pacotes no servidor.
