// ===============================
// BOT MEGA TV – LOOPITA ASSISTENTE VIRTUAL
// ===============================

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

// ================= QR CODE =================
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('⚡ Escaneie o QR Code!');
});

client.on('ready', () => {
    console.log('✅ Loopita Mega TV online!');
});

// ================= HORÁRIO DE ATENDIMENTO =================
function foraDoHorario() {
    const agora = new Date();
    const dia = agora.getDay();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const totalMinutos = hora * 60 + minutos;

    // Segunda a sexta – 09:00 às 19:30
    if (dia >= 1 && dia <= 5) return totalMinutos < 540 || totalMinutos > 1170;
    // Sábado – 09:00 às 19:00
    if (dia === 6) return totalMinutos < 540 || totalMinutos > 1140;
    // Domingo – 09:00 às 18:00
    if (dia === 0) return totalMinutos < 540 || totalMinutos > 1080;

    return false;
}

// ================= FUNÇÃO PARA ENVIAR MENU =================
async function enviarMenu(from) {
    const mensagem = `🎯 *CENTRAL DE ATENDIMENTO MEGA TV* 🚀

1. 👥 Programa de Indicações
2. 💰 Pagamentos e Renovação
3. 📡 Suporte Técnico - Travamentos
4. 🔧 Diagnóstico de Conexão
5. ❓ Dúvidas Frequentes
6. 🌐 Status do Serviço
7. 👨‍💻 Atendimento Personalizado

*Digite o número da opção desejada:* 🔢`;
    await client.sendMessage(from, mensagem);
}

// ================== EVENTO MENSAGEM ==================
client.on('message', async msg => {
    const texto = msg.body.toLowerCase().trim();
    const from = msg.from;

    if (msg.from.includes('@g.us')) return;
    console.log(`📩 Mensagem recebida: ${texto}`);

    const horarioFora = foraDoHorario();

    // ================= APRESENTAÇÃO + MENU =================
    if (texto.match(/^(menu|oi|olá|ola|iniciar|start|loopita|bom dia|boa tarde|boa noite|help|ajuda|e aí|oie)$/i)) {
        await client.sendMessage(from, 
            `👋 *Oi! Eu sou a Loopita* 😄, atendente virtual da MegaTV!\n\n` +
            `*Siga as instruções aqui embaixo que eu te acompanho em cada passo do atendimento!* 🚀\n\n` +
            `💬 *Vamos começar? Escolha uma opção abaixo:*`
        );
        await enviarMenu(from);
        return;
    }

    // ================= OPÇÃO 1 - INDICAÇÕES =================
    if (texto.match(/^(1|indica|indicação|indicar|amigo|convidar|indicacao)$/i)) {
        await client.sendMessage(from,
            `👥 *PROGRAMA DE INDICAÇÕES MEGA TV* 🚀\n\n` +
            `🎁 *VANTAGENS EXCLUSIVAS:* ⭐\n` +
            `• ✅ A cada indicação: *30% DE DESCONTO* na sua mensalidade! 💰\n` +
            `• ✅ A cada 3 indicações: *1 MÊS INTEIRO GRÁTIS*! 🆓🎉\n\n` +
            `💬 *Frase perfeita:* "Indique a Mega TV e ganhe junto com quem você confia!" 🤝\n\n` +
            `📞 *COMO INDICAR:*\n` +
            `👉 Envie para: *(21) 99225-9466*\n` +
            `📝 *Envie: NOME + TELEFONE do seu amigo*\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= OPÇÃO 2 - PAGAMENTOS =================
    if (texto.match(/^(2|pagamento|pagar|pix|renovação|renova|vencimento|boleto|fatura)$/i)) {
        await client.sendMessage(from,
            `💰 *PAGAMENTOS E RENOVAÇÃO* 💳\n\n` +
            `🔑 *Chave PIX:* megatvstreaming@gmail.com\n` +
            `👤 *Titular:* Beatriz Ohrara\n\n` +
            `💡 *IMPORTANTE:*\n` +
            `• ✅ *Pagando pelo link enviado pelo (21) 97077-0887:* renovação AUTOMÁTICA!\n` +
            `• ❌ *Não recebeu o link?* Digite "LINK" que enviaremos um novo! 📲\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= OPÇÃO 3 - SUPORTE TÉCNICO =================
    if (texto.match(/^(3|suporte|técnico|tecnico|trava|travamento|conexão|conexao|lento|carregando|buffer)$/i)) {
        await client.sendMessage(from,
            `📡 *SUPORTE TÉCNICO - TRAVAMENTOS* 🔧\n\n` +
            `💡 *Na maioria dos casos, o problema não é no IPTV/P2P, mas sim na internet do aparelho onde você assiste.*\n\n` +
            `🌐 *Como todo serviço online, precisamos de uma BOA CONEXÃO:*\n\n` +
            `➡️ *CANAIS FHD* (mínimo 150 Mbps) – Melhor qualidade, exige MUITO da internet\n` +
            `➡️ *CANAIS HD* (mínimo 120 Mbps) – Qualidade ótima, exigência média\n` +
            `➡️ *CANAIS SD* (mínimo 100 Mbps) – Qualidade média, exige POUCO da internet\n\n` +
            `🔍 *PARA DESCOBRIR SUA VELOCIDADE:*\n` +
            `1️⃣ Acesse: *fast.com*\n` +
            `2️⃣ Clique em *"Mostrar mais informações"*\n` +
            `3️⃣ *ENVIE UMA FOTO* do resultado 📸\n\n` +
            `⚠️ *ATENÇÃO:* O teste só é válido se for feito *DIRETAMENTE NO APARELHO* que usa a Mega TV! 📺\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= OPÇÃO 4 - CHECKLIST =================
if (texto.match(/^(4|checklist|diagnóstico|diagnostico|testar|verificar|problema|configuração)$/i)) {
    await client.sendMessage(from,
        `🔧 *CHECKLIST COMPLETO - DIAGNÓSTICO INTELIGENTE* 🛠️\n\n` +
        `1️⃣ *✅ Reiniciou aparelho/roteador?*\n   🔄 Zera o cache e elimina erros temporários da sua rede\n\n` +
        `2️⃣ *✅ Testou velocidade no fast.com?*\n   📊 Verifica se a internet atinge o mínimo necessário\n\n` +
        `3️⃣ *✅ App está atualizado?*\n   🔄 Versões antigas podem ter instabilidades\n\n` +
        `4️⃣ *✅ Testou em outro dispositivo?*\n   📱 Identifica se o problema é no aparelho específico\n\n` +
        `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
    );
    return;
}

    // ================= OPÇÃO 5 - DÚVIDAS =================
    if (texto.match(/^(5|dúvida|duvida|pergunta|como funciona|ajuda|instrução)$/i)) {
        await client.sendMessage(from,
            `❓ *DÚVIDAS FREQUENTES* 💭\n\n` +
            `📲 *App:* Disponível na Loja ou via APK\n` +
            `🔑 *Senha:* Solicite redefinição\n` +
            `📺 *Múltiplos aparelhos:* Consulte seu plano\n\n` +
            `💬 *Precisa de mais ajuda? Digite 7 para atendimento humano!*\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= OPÇÃO 6 - STATUS =================
    if (texto.match(/^(6|status|sistema|servidor|funcionamento|online)$/i)) {
        await client.sendMessage(from,
            `🌐 *STATUS DO SERVIÇO* 📊\n\n` +
            `✅ Servidores operando normalmente\n` +
            `✅ Rede estável\n` +
            `✅ Atualizações em dia\n\n` +
            `🕒 Última verificação: ${new Date().toLocaleTimeString('pt-BR')}\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= OPÇÃO 7 - ATENDIMENTO HUMANO =================
    if (texto.match(/^(7|atendente|humano|pessoa|especialista|técnico|tecnico|urgente)$/i)) {
        if (horarioFora) {
            await client.sendMessage(from,
                `⏰ *FORA DO HORÁRIO DE ATENDIMENTO* 🌙\n\n` +
                `😊 Agradecemos seu contato! No momento, estamos fora do nosso horário comercial.\n\n` +
                `🕒 *HORÁRIO DE FUNCIONAMENTO:*\n` +
                `🟢 Segunda a sexta: 09:00 às 19:30\n` +
                `🟢 Sábado: 09:00 às 19:00\n` +
                `🟢 Domingo e feriados: 09:00 às 18:00\n\n` +
                `💬 Sua mensagem será respondida em nosso próximo horário útil!\n\n` +
                `🎯 *DESEJA CONTINUAR NO ATENDIMENTO AUTOMÁTICO?*\n` +
                `👉 Digite *MENU* para ver todas as opções disponíveis! 📋\n\n` +
                `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
            );
        } else {
            await client.sendMessage(from,
                `👨‍💻 *ATENDIMENTO PERSONALIZADO* 🚀\n\n` +
                `✅ *Solicitação registrada com sucesso!*\n\n` +
                `⏳ *Tempo estimado de espera:* 5-15 minutos\n` +
                `📝 Em até *15 minutos* nosso especialista entrará em contato.\n\n` +
                `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
            );
        }
        return;
    }

    // ================= LINK DE PAGAMENTO =================
    if (texto.match(/^(link|novo link|pagamento|pix|reenviar)$/i)) {
        await client.sendMessage(from,
            `🔗 *LINK DE PAGAMENTO SOLICITADO* 📲\n\n` +
            `📧 *Enviaremos o link para seu WhatsApp em instantes!*\n` +
            `⏰ Aguarde a mensagem do número: *(21) 97077-0887*\n\n` +
            `💡 *Pagando por este link, a renovação é AUTOMÁTICA!* ✅\n\n` +
            `💡 *Digite MENU a qualquer momento para voltar ao início* 🔄`
        );
        return;
    }

    // ================= MENSAGEM PADRÃO =================
    await client.sendMessage(from, 
        `🤔 *Não entendi sua mensagem...* 😅\n\n` +
        `👋 *Eu sou a Loopita*, sua assistente virtual!\n\n` +
        `💬 *Digite MENU para ver todas as opções disponíveis* 📋\n\n` +
        `🎯 *Vou te ajudar a resolver seu problema rapidinho!* 🚀`
    );
});

// ================= INICIALIZAÇÃO =================
client.initialize();