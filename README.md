# Prospecta — V1 (protótipo)

Interface inicial para uma plataforma de prospecção comercial local, com identidade visual azul e branco.

## O que funciona nesta versão
- Interface responsiva para desktop e celular.
- Pesquisa demonstrativa por segmento, cidade e estado.
- Filtros locais nos resultados.
- Seleção de empresas demonstrativas.
- Exportação dos resultados para CSV.
- Mensagens de feedback e navegação adaptada para celular.

## Limitações importantes
- Os registros são **fictícios** e servem apenas para demonstrar a interface.
- A pesquisa não consulta empresas reais nem qualquer API externa.
- A opção “Salvar lista” funciona apenas durante a sessão atual; não há persistência.
- Não existe backend, autenticação ou banco de dados nesta versão.
- Não insira dados pessoais ou informações comerciais reais.

## Publicar no GitHub Pages
1. Crie um repositório público no GitHub chamado `prospecta` (ou o nome que preferir).
2. Envie `index.html`, `styles.css`, `app.js`, `README.md` e `.nojekyll` para a raiz do repositório.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/(root)`, depois clique em **Save**.
6. Aguarde o GitHub publicar o site. O endereço aparecerá na mesma página de Settings → Pages.

## Próxima etapa: aplicação completa
Para pesquisar fontes reais com segurança, será necessário adicionar um backend (Python + Flask), validação, autenticação, banco de dados e um conector para uma fonte autorizada. O GitHub Pages não executa Flask; o backend precisará de hospedagem compatível com Python e HTTPS. Chaves de API não devem ser colocadas no JavaScript do navegador.

## Estrutura sugerida para a etapa seguinte
```text
prospecta/
├── index.html
├── styles.css
├── app.js
├── README.md
└── .nojekyll
```

## Licenciamento e fontes
Antes de conectar provedores de dados, confira os termos atuais da API ou fonte, especialmente regras de atribuição, armazenamento e redistribuição.
