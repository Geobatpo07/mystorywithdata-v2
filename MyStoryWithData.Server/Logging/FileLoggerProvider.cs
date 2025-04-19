using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.IO;

namespace MyStoryWithData.Server.Logging
{
	public class FileLoggerProvider : ILoggerProvider
	{
		private readonly string _path;
		private readonly ConcurrentDictionary<string, FileLogger> _loggers = new();

		public FileLoggerProvider(string path)
		{
			_path = path;
		}

		public ILogger CreateLogger(string categoryName)
		{
			return _loggers.GetOrAdd(categoryName, name => new FileLogger(_path));
		}

		public void Dispose()
		{
		}
	}

	public class FileLogger : ILogger
	{
		private readonly string _path;
		private static readonly object _lock = new();

		public FileLogger(string path)
		{
			_path = path;
			var logDirectory = Path.GetDirectoryName(path) ?? "Logs";
			Directory.CreateDirectory(logDirectory); // Crée dossier si inexistant
		}

		public IDisposable BeginScope<TState>(TState state) => null!;
		public bool IsEnabled(LogLevel logLevel) => true;

		public void Log<TState>(
			LogLevel logLevel,
			EventId eventId,
			TState state,
			Exception? exception,
			Func<TState, Exception?, string> formatter)
		{
			if (!IsEnabled(logLevel)) return;

			var logFile = _path.Replace("{Date}", DateTime.UtcNow.ToString("yyyyMMdd"));
			var message = $"{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss} [{logLevel}] {formatter(state, exception)}";

			lock (_lock)
			{
				File.AppendAllText(logFile, message + Environment.NewLine);
			}
		}
	}

	public static class FileLoggerExtensions
	{
		public static ILoggingBuilder AddFile(this ILoggingBuilder builder, string path)
		{
			builder.AddProvider(new FileLoggerProvider(path));
			return builder;
		}
	}
}
