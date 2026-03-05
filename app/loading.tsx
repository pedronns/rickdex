export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-transparent" />
    </div>
  )
}