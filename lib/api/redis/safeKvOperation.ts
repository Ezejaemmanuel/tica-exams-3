type KVOperation<T> = () => Promise<T>;

// Helper function to perform KV operations safely
export async function safeKVOperation<T>(operation: KVOperation<T>): Promise<T | null> {
    try {
        const result = await operation();
        // console.log('KV operation successful:', result);
        return result;
    } catch (error) {
        // console.error('KV operation error:', error);
        // Return null to indicate the operation did not succeed
        return null;
    }
}
