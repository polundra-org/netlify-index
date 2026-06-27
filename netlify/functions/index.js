export default async (request, context) => {
  if (request.method !== "POST") {
    return new Response("Метод не поддерживается", { status: 405 });
  }

  try {
    // Получаем тело запроса как обычный текст (не JSON)
    const formDataText = await request.text();
    
    // Парсим каноничные параметры формы (application/x-www-form-urlencoded)
    const params = new URLSearchParams(formDataText);
    const name = params.get("name");
    const message = params.get("message");

    // Тут можно сделать полезное действие (например, сохранить в базу или лог)
    console.log(`Успешно обработано на сервере! Имя: ${name}, Сообщение: ${message}`);

    // Отдаем пользователю чистый HTML-ответ прямо из функции
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Успех</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </head>
      <body class="bg-slate-50 flex flex-col justify-center items-center min-h-screen text-center">
        <div class="bg-white p-8 rounded-xl shadow-md max-w-sm">
          <span class="text-4xl">🎉</span>
          <h1 class="text-xl font-bold text-slate-900 mt-4">Спасибо, ${name}!</h1>
          <p class="text-slate-500 text-sm mt-2">Форма успешно отправлена без единой строчки JS на клиенте.</p>
          <a href="/" class="inline-block mt-6 text-sm text-teal-600 hover:underline">← Вернуться назад</a>
        </div>
      </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error) {
    return new Response(`Ошибка сервера: ${error.message}`, { status: 500 });
  }
};
