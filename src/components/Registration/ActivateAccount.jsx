import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router";
import apiClient from "../../services/api-client";

const VerifyEmail = () => {
  const {uid, token} = useParams();
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!uid || !token) {
        setStatus("error");
        setMessage("Missing verification credentials.");
        return;
      }

      try {
        // Replace with your actual backend endpoint (e.g., /auth/verify-email/)
        const res = await apiClient.post("auth/users/activation/", { uid,token });
        
        if (res.status === 204 || res.data?.success) {
          setStatus("success");
          setMessage("Your email has been successfully verified!");
        } else {
          throw new Error();
        }
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.token || err.response?.data?.uid || "Verification link is invalid or expired.");
      }
    };

    verify();
  }, [uid,token]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        {/* Decorative Top Bar */}
        <div className={`h-2 w-full ${
          status === 'verifying' ? 'bg-primary animate-pulse' : 
          status === 'success' ? 'bg-success' : 'bg-error'
        }`} />

        <div className="card-body p-8 text-center">
          {/* 1. VERIFYING STATE */}
          {status === "verifying" && (
            <div className="animate-in fade-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                <Loader2 size={40} className="animate-spin" />
              </div>
              <h1 className="text-2xl font-black italic">Verifying Email</h1>
              <p className="text-sm opacity-60 mt-2">Please wait while we confirm your account...</p>
            </div>
          )}

          {/* 2. SUCCESS STATE */}
          {status === "success" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 text-success mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="text-2xl font-black italic">Account Activated!</h1>
              <p className="text-sm opacity-60 mt-2">{message}</p>
              
              <div className="mt-8 space-y-3">
                <Link to="/login" className="btn btn-primary btn-block shadow-lg shadow-primary/20">
                  Go to Login <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}

          {/* 3. ERROR STATE */}
          {status === "error" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-error/10 text-error mb-6">
                <XCircle size={40} />
              </div>
              <h1 className="text-2xl font-black italic">Verification Failed</h1>
              <p className="text-sm opacity-60 mt-2 text-error font-medium">{message}</p>
              
              <div className="mt-8 space-y-3">
                <Link to="/register" className="btn btn-outline btn-block">
                  Try Registering Again
                </Link>
                <Link to="/login" className="btn btn-ghost btn-sm opacity-50">
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;