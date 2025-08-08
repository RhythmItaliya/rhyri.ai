'use client';

import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name: string; image: string; email?: string };
}

export default function SettingsModal({ isOpen, onClose, user }: SettingsModalProps) {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [hasPassword, setHasPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            checkPasswordStatus();
        }
    }, [isOpen]);

    const checkPasswordStatus = async () => {
        try {
            const response = await fetch('/api/user/check-password');
            if (response.ok) {
                const data = await response.json();
                setHasPassword(data.hasPassword);
            }
        } catch (error) {
            console.error('Error checking password status:', error);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/user/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                setSuccess('Password updated successfully!');
                setNewPassword('');
                setConfirmPassword('');
                setHasPassword(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to update password');
            }
        } catch (error) {
            setError('An error occurred while updating password');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Password Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}

                {!hasPassword && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                            You don't have a password set. Add one to sign in with email and
                            password.
                        </p>
                    </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <Input
                        label={hasPassword ? 'New Password' : 'Set Password'}
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={hasPassword ? 'Enter new password' : 'Enter password'}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
                        required
                    />

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="flex-1">
                            {loading
                                ? 'Updating...'
                                : hasPassword
                                  ? 'Update Password'
                                  : 'Set Password'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
