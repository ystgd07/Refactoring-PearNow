export default function EmptyState({
  icon = '📋',
  title = '프로젝트가 없습니다',
  description = '새 프로젝트를 생성해보세요!',
  actionComponent,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <span className="text-6xl mb-4">{icon}</span>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {actionComponent}
    </div>
  );
}
