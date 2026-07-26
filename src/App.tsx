import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LivePixSection } from './components/LivePixSection';
import { VipStoreSection } from './components/VipStoreSection';
import { ScheduleSection } from './components/ScheduleSection';
import { NewsSection } from './components/NewsSection';
import { LinksSection } from './components/LinksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StreamerConfigModal } from './components/StreamerConfigModal';
import { RegisterModal } from './components/RegisterModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminRestrictedModal } from './components/AdminRestrictedModal';

import { 
  defaultChannelInfo, 
  defaultVipPlans, 
  defaultNews, 
  defaultSchedule, 
  defaultFaq,
  defaultSocialLinks 
} from './data/defaultData';
import { ChannelInfo, ThemeAccent, VipPlan, NewsItem, ScheduleItem, FaqItem, SocialLink, UserProfile } from './types';
import { checkScheduleLiveStatus, ScheduleLiveStatus } from './utils/scheduleLiveHelper';

export default function App() {
  // User Profile State (saved in localStorage)
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nexus_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved user profile', e);
      }
    }
    return null;
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_user_profile');
    return !saved;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminRestrictedModalOpen, setIsAdminRestrictedModalOpen] = useState(false);

  // Channel Info State

  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(() => {
    const saved = localStorage.getItem('nexus_channel_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved channel info', e);
      }
    }
    return defaultChannelInfo;
  });

  // Simulated live test mode state (for 1 hour duration testing)
  const [simulatedLiveStartTime, setSimulatedLiveStartTime] = useState<Date | null>(() => {
    const saved = localStorage.getItem('nexus_simulated_live');
    return saved ? new Date(saved) : null;
  });

  // VIP Plans State
  const [vipPlans, setVipPlans] = useState<VipPlan[]>(() => {
    const saved = localStorage.getItem('nexus_vip_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved VIP plans', e);
      }
    }
    return defaultVipPlans;
  });

  // Schedule State
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('nexus_schedule');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved schedule', e);
      }
    }
    return defaultSchedule;
  });

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('nexus_news');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved news', e);
      }
    }
    return defaultNews;
  });

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem('nexus_social_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved social links', e);
      }
    }
    return defaultSocialLinks;
  });

  // FAQ State
  const [faqList, setFaqList] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('nexus_faq');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved FAQ', e);
      }
    }
    return defaultFaq;
  });

  const [activeAccent, setActiveAccent] = useState<ThemeAccent>('red');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [initialConfigTab, setInitialConfigTab] = useState<'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq'>('geral');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('nexus_channel_info', JSON.stringify(channelInfo));
  }, [channelInfo]);

  useEffect(() => {
    localStorage.setItem('nexus_vip_plans', JSON.stringify(vipPlans));
  }, [vipPlans]);

  useEffect(() => {
    localStorage.setItem('nexus_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('nexus_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('nexus_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('nexus_faq', JSON.stringify(faqList));
  }, [faqList]);

  // Automatic 1-Hour Schedule Live Status Monitor
  useEffect(() => {
    const updateLiveStatusFromSchedule = () => {
      const liveStatus = checkScheduleLiveStatus(schedule, new Date(), simulatedLiveStartTime);

      setChannelInfo(prev => {
        const isLiveNow = liveStatus.isLive;
        const currentGame = liveStatus.isLive && liveStatus.activeItem 
          ? liveStatus.activeItem.game 
          : (prev.currentGame || 'GTA RP / Multijogador');
        const liveTitle = liveStatus.isLive && liveStatus.activeItem 
          ? `🔴 TRANSMISSÃO AO VIVO • ${liveStatus.activeItem.gameCategory || 'Gameplay'}` 
          : (prev.liveTitle || 'Lives quase todos os dias!');

        if (prev.isLiveNow !== isLiveNow || prev.currentGame !== currentGame || prev.liveTitle !== liveTitle) {
          return {
            ...prev,
            isLiveNow,
            currentGame,
            liveTitle
          };
        }
        return prev;
      });
    };

    updateLiveStatusFromSchedule();
    const interval = setInterval(updateLiveStatusFromSchedule, 1000);
    return () => clearInterval(interval);
  }, [schedule, simulatedLiveStartTime]);

  const handleStartSimulatedLive = () => {
    const now = new Date();
    setSimulatedLiveStartTime(now);
    localStorage.setItem('nexus_simulated_live', now.toISOString());
  };

  const handleStopSimulatedLive = () => {
    setSimulatedLiveStartTime(null);
    localStorage.removeItem('nexus_simulated_live');
  };

  // Handlers for Channel Info
  const handleSaveChannelInfo = (updated: ChannelInfo) => {
    setChannelInfo(updated);
  };

  const handleResetChannelInfo = () => {
    setChannelInfo(defaultChannelInfo);
    localStorage.removeItem('nexus_channel_info');
  };

  // Handlers for VIP Plans
  const handleSaveVipPlans = (updatedPlans: VipPlan[]) => {
    setVipPlans(updatedPlans);
  };

  const handleDeleteVipPlan = (id: string) => {
    setVipPlans(prev => prev.filter(p => p.id !== id));
  };

  // Handlers for Schedule
  const handleSaveSchedule = (updatedSchedule: ScheduleItem[]) => {
    setSchedule(updatedSchedule);
  };

  const handleDeleteScheduleItem = (id: string) => {
    setSchedule(prev => prev.filter(s => s.id !== id));
  };

  // Handlers for News
  const handleSaveNews = (updatedNews: NewsItem[]) => {
    setNewsList(updatedNews);
  };

  const handleDeleteNewsItem = (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
  };

  // Handlers for Social Links
  const handleSaveSocialLinks = (updatedLinks: SocialLink[]) => {
    setSocialLinks(updatedLinks);
  };

  const handleDeleteSocialLink = (id: string) => {
    setSocialLinks(prev => prev.filter(l => l.id !== id));
  };

  // Handlers for FAQ
  const handleSaveFaq = (updatedFaq: FaqItem[]) => {
    setFaqList(updatedFaq);
  };

  const handleDeleteFaqItem = (id: string) => {
    setFaqList(prev => prev.filter(f => f.id !== id));
  };

  // User Profile Handlers
  const handleRegister = (profile: UserProfile) => {
    setCurrentUserProfile(profile);
    localStorage.setItem('nexus_user_profile', JSON.stringify(profile));
    setIsRegisterModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUserProfile(null);
    localStorage.removeItem('nexus_user_profile');
    setIsProfileModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToAdmin = () => {
    setIsAdminRestrictedModalOpen(false);
    setIsProfileModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const openModalWithTab = (tab: 'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq') => {
    if (!currentUserProfile) {
      setIsRegisterModalOpen(true);
      return;
    }

    if (currentUserProfile.email.toLowerCase() === 'brennomcpe10@gmail.com') {
      setInitialConfigTab(tab);
      setIsConfigOpen(true);
    } else {
      setIsAdminRestrictedModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans selection:bg-red-500 selection:text-white">
      
      {/* User Registration Modal (Mandatory Gate) */}
      <RegisterModal
        isOpen={isRegisterModalOpen || !currentUserProfile}
        currentUserProfile={currentUserProfile}
        onRegister={handleRegister}
        isMandatory={!currentUserProfile}
      />

      {/* User Profile View / Edit Modal */}
      {currentUserProfile && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          userProfile={currentUserProfile}
          onClose={() => setIsProfileModalOpen(false)}
          onEditProfile={() => {
            setIsProfileModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Access Restricted Modal */}
      <AdminRestrictedModal
        isOpen={isAdminRestrictedModalOpen}
        userEmail={currentUserProfile?.email || ''}
        onClose={() => setIsAdminRestrictedModalOpen(false)}
        onSwitchToAdmin={handleSwitchToAdmin}
      />

      {/* Navigation Bar */}
      <Navbar
        channelInfo={channelInfo}
        activeAccent={activeAccent}
        currentUserProfile={currentUserProfile}
        onAccentChange={setActiveAccent}
        onOpenStreamerConfig={() => openModalWithTab('geral')}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAdminRestrictedModal={() => setIsAdminRestrictedModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Página Inicial */}
        <Hero channelInfo={channelInfo} activeAccent={activeAccent} />

        {/* 2. Seção LivePix */}
        <LivePixSection channelInfo={channelInfo} />

        {/* 3. Loja VIP */}
        <VipStoreSection 
          vipPlans={vipPlans} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('vip')}
          onDeletePlan={handleDeleteVipPlan}
        />

        {/* 4. Agenda de Lives */}
        <ScheduleSection 
          schedule={schedule} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('agenda')}
          onDeleteSchedule={handleDeleteScheduleItem}
        />

        {/* 5. Notícias */}
        <NewsSection 
          newsList={newsList}
          onManage={() => openModalWithTab('noticias')}
          onDeleteNews={handleDeleteNewsItem}
        />

        {/* 6. Links */}
        <LinksSection 
          channelInfo={channelInfo}
          socialLinks={socialLinks}
          onManage={() => openModalWithTab('links')}
          onDeleteLink={handleDeleteSocialLink}
        />

        {/* 7. FAQ */}
        <FaqSection 
          faqList={faqList} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('faq')}
          onDeleteFaq={handleDeleteFaqItem}
        />
      </main>

      {/* 8. Rodapé */}
      <Footer
        channelInfo={channelInfo}
        onOpenStreamerConfig={() => openModalWithTab('geral')}
      />

      {/* Streamer Configuration Admin Modal */}
      {isConfigOpen && (
        <StreamerConfigModal
          initialTab={initialConfigTab}
          channelInfo={channelInfo}
          vipPlans={vipPlans}
          schedule={schedule}
          newsList={newsList}
          socialLinks={socialLinks}
          faqList={faqList}
          simulatedLiveStartTime={simulatedLiveStartTime}
          onStartSimulatedLive={handleStartSimulatedLive}
          onStopSimulatedLive={handleStopSimulatedLive}
          onSaveChannelInfo={handleSaveChannelInfo}
          onResetChannelInfo={handleResetChannelInfo}
          onSaveVipPlans={handleSaveVipPlans}
          onSaveSchedule={handleSaveSchedule}
          onSaveNews={handleSaveNews}
          onSaveSocialLinks={handleSaveSocialLinks}
          onSaveFaq={handleSaveFaq}
          onClose={() => setIsConfigOpen(false)}
        />
      )}

    </div>
  );
}
