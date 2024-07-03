const Login =() =>
{
    return(
        <>
        <div>This is Login page</div>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
        </form>
      </div>
    </div>

        </>
    )
}

export default Login;