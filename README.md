# 🏠 Missão Casa

App gamificado da rotina da família: missões do dia por período (manhã, tarde, noite), revezamento automático entre irmãos, agenda das crianças por tipo (escola, atividade, saúde, passeio) com eventos de um dia só, pausas para férias/feriado/doença, loja de recompensas com estrelas, áudio para quem ainda não lê, sugestões de missões por idade e resultados para os pais.

Ideia de Maitê e Maya.

## Dois jeitos de usar

- **Só neste aparelho (sem conta):** funciona assim que abre. A área dos pais usa senha (padrão `1234`).
- **Família na nuvem (Firebase):** o responsável cria conta e recebe três códigos:
  - **Código das crianças** (ex. `ABC123`): no celular ou tablet delas, em "Sou criança". Elas só marcam missões e fazem pedidos na loja.
  - **Convite de responsável** (ex. `ABC123-XYZ789`): para o pai, a mãe ou outro responsável, que cria a própria conta e entra em "Tenho um convite". Acesso total ao painel.
  - **Convite da rede de apoio** (ex. `ABC123-QWE456`): para avós, babá e tios, em "Sou da rede de apoio". Só acompanham a rotina, sem mudar nada.

  Se um convite vazar, o painel tem um botão para gerar convites novos (os antigos param de funcionar).

## Como ligar a nuvem (uma vez só, uns 10 minutos)

1. Entre em <https://console.firebase.google.com> com sua conta Google e clique em **Criar projeto**. Nome: `missao-casa`. Pode desligar o Google Analytics. O plano gratuito (Spark) basta.
2. No menu **Criação > Authentication**, clique em **Vamos começar** e ative dois métodos de login: **E-mail/senha** e **Anônimo** (o anônimo é o das crianças, que não precisam de e-mail).
3. Em **Criação > Firestore Database**, clique em **Criar banco de dados**: modo **produção**, local `southamerica-east1 (São Paulo)`.
4. Ainda no Firestore, abra a aba **Regras**, apague o que estiver lá, cole o conteúdo do arquivo `firestore.rules` deste repositório e clique em **Publicar**. São essas regras que garantem que cada família só vê os próprios dados e que a criança só consegue marcar missões.
5. Clique na engrenagem ⚙️ > **Configurações do projeto** > **Seus apps** > ícone **`</>`** (Web). Dê o nome "Missão Casa" e registre. Copie o bloco `firebaseConfig` que aparece.
6. Edite o arquivo `firebase-config.js` deste repositório e troque `window.FIREBASE_CONFIG = null;` por `window.FIREBASE_CONFIG = { ...o que você copiou... };`
7. Em **Authentication > Configurações > Domínios autorizados**, adicione `mahlarsan.github.io`.

Pronto: ao abrir o app aparece a tela de entrada ("Sou responsável" / "Sou criança").

> A `apiKey` do Firebase pode ficar pública no GitHub: ela só identifica o projeto. Quem protege os dados são as regras do passo 4.

## Identidade visual

O app segue o **Brand system 0.1** (pasta `marca/`, com o `Manual_de_Marca_v01.pdf`):

- Paleta: amarelo sol `#FFD52A` e roxo elétrico `#7738EA` como protagonistas, creme `#FFFDF5` de respiro e tinta `#242034` nos textos e contornos. Coral, azul piscina, lima e lilás aparecem como apoio.
- Personagens Órbita, Zigue, Pingo e Faísca, com acessórios em camadas SVG (viewBox 256×256). A criança monta o próprio avatar tocando no cartão dela.
- Biblioteca de ícones da criação (pasta `marca/icones/`, 77 desenhos): navegação, ações, períodos, agenda, pausas, loja, entrada, painel e a biblioteca de missões, atividades e recompensas que os pais escolhem numa galeria. Emojis antigos viram o ícone equivalente automaticamente.
- Gradientes só em momentos de conquista (palco do avatar, dia completo).
- Navegação da criança: Hoje / Avatar / Loja / Mundos (em breve). O painel da família fica fora da barra, no cadeado do topo, com abas Rotina, Loja, Resultados e Família.
- Microanimações de 250 a 450 ms sem flashes, vinheta curta com botão de mudo e opção "menos movimento".

Pendências do manual: nome e logotipo, fonte licenciada (hoje usa Fredoka e Nunito, ambas de licença aberta), mecânica dos Mundos e testes com crianças.

## Privacidade (LGPD)

Os dados das crianças ficam sob a conta do responsável. O app guarda só apelido, avatar (emoji), missões e agenda: nada de e-mail, foto ou documento das crianças. Antes de abrir para outras famílias, vale incluir um termo de consentimento dos responsáveis e uma revisão jurídica.

> **Atualizou o app?** Sempre que o arquivo `firestore.rules` mudar, cole a versão nova em Firestore > Regras e publique de novo.

## Próximos passos

- Pais confirmarem a missão antes de os pontos valerem.
- Lembretes (notificação) na hora das missões e da agenda.
