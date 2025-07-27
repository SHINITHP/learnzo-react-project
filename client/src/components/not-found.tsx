import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8 animate-pulse"></div>
        </div>

        {/* Message */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Oops! Page not found
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground">
            Route: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button asChild size="lg" className="hover-scale">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="hover-scale">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 opacity-50">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;