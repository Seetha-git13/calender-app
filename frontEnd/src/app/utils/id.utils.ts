export function generateId(prefix = 'ev'):string{
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
}