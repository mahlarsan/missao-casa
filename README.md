# 🏠 Missão Casa

App gamificado da rotina da família: missões do dia por período (manhã, tarde, noite), revezamento automático entre irmãos, agenda das crianças (escola, aulas, atividades), placar com prêmio da semana e resultados para os pais.

Ideia de Maitê e Maya.

## Dois jeitos de usar

- **Só neste aparelho (sem conta):** funciona assim que abre. A área dos pais usa senha (padrão `1234`).
- **Família na nuvem (Firebase):** o responsável cria conta, recebe um **código da família** e as crianças entram com esse código no celular ou tablet delas. O que uma criança marca aparece na hora para os pais.

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

## Privacidade (LGPD)

Os dados das crianças ficam sob a conta do responsável. O app guarda só apelido, avatar (emoji), missões e agenda: nada de e-mail, foto ou documento das crianças. Antes de abrir para outras famílias, vale incluir um termo de consentimento dos responsáveis e uma revisão jurídica.

## Próximos passos

- Segundo responsável (ex.: o pai) entrar na mesma família com convite próprio.
- Exceções por data (feriado, dia sem aula, passeio).
- Pais confirmarem a missão antes de os pontos valerem.
